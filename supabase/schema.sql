-- ============== Property 9ja — Full Schema ==============

-- Enable pg_trgm for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. PROFILES (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'renter' CHECK (role IN ('renter','agent','landlord','admin')),
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified','pending','verified','rejected')),
  trust_score DECIMAL(3,2) DEFAULT 0.00,
  agency TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  member_since TIMESTAMPTZ DEFAULT now(),
  response_time TEXT DEFAULT 'Within 24 hours',
  listings_count INTEGER DEFAULT 0,
  properties_sold INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are public"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
-- NOTE: SET search_path = public is critical — the trigger runs inside
-- the auth schema context where bare `profiles` may not resolve.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. PROPERTIES
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'apartment' CHECK (type IN ('apartment','house','duplex','bungalow','penthouse','land','commercial')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','rented','sold','pending')),
  price DECIMAL(12,2) NOT NULL,
  price_period TEXT DEFAULT 'year' CHECK (price_period IN ('year','month','total')),
  address TEXT DEFAULT '',
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  lga TEXT DEFAULT '',
  neighborhood TEXT DEFAULT '',
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  toilets INTEGER DEFAULT 0,
  parking INTEGER DEFAULT 0,
  furnished BOOLEAN DEFAULT false,
  electricity TEXT DEFAULT '',
  water TEXT DEFAULT '',
  security TEXT DEFAULT '',
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  video_url TEXT DEFAULT '',
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('unverified','pending','verified','rejected')),
  trust_score DECIMAL(3,2) DEFAULT 0.00,
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available','booked','rented','sold')),
  total_move_in_cost DECIMAL(12,2) DEFAULT 0,
  lat DECIMAL(10,7) DEFAULT 0,
  lng DECIMAL(10,7) DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Full-text search vector
ALTER TABLE properties ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(city,'') || ' ' || coalesce(neighborhood,'') || ' ' || coalesce(state,''))
  ) STORED;

CREATE INDEX properties_search_idx ON properties USING GIN(search_vector);
CREATE INDEX properties_city_idx ON properties(city);
CREATE INDEX properties_type_idx ON properties(type);
CREATE INDEX properties_price_idx ON properties(price);
CREATE INDEX properties_status_idx ON properties(status);
CREATE INDEX properties_verification_idx ON properties(verification_status);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are public"
  ON properties FOR SELECT USING (true);

CREATE POLICY "Agents can insert own properties"
  ON properties FOR INSERT WITH CHECK (auth.uid() = agent_id OR auth.uid() = owner_id);

CREATE POLICY "Agents can update own properties"
  ON properties FOR UPDATE USING (auth.uid() = agent_id OR auth.uid() = owner_id);

CREATE POLICY "Admins can manage all properties"
  ON properties FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. PROPERTY IMAGES
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT DEFAULT '',
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Property images are public" ON property_images FOR SELECT USING (true);
CREATE POLICY "Agents can manage own property images" ON property_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM properties WHERE id = property_id AND (agent_id = auth.uid() OR owner_id = auth.uid()))
);

-- 4. SAVED PROPERTIES (Favorites)
CREATE TABLE saved_properties (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, property_id)
);

ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own saved properties"
  ON saved_properties FOR ALL USING (auth.uid() = user_id);

-- 5. SAVED SEARCHES
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  filters JSONB DEFAULT '{}',
  alert_frequency TEXT DEFAULT 'never' CHECK (alert_frequency IN ('never','daily','weekly')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own saved searches"
  ON saved_searches FOR ALL USING (auth.uid() = user_id);

-- 6. REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are public" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 7. CONVERSATIONS
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  property_title TEXT DEFAULT '',
  property_image TEXT DEFAULT '',
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  last_message TEXT DEFAULT '',
  last_message_at TIMESTAMPTZ DEFAULT now(),
  buyer_unread INTEGER DEFAULT 0,
  agent_unread INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = agent_id);
CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- 8. MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL DEFAULT '',
  attachments TEXT[] DEFAULT '{}',
  read_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversation messages"
  ON messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM conversations WHERE id = conversation_id AND (buyer_id = auth.uid() OR agent_id = auth.uid()))
  );
CREATE POLICY "Users can send messages in own conversations"
  ON messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM conversations WHERE id = conversation_id AND (buyer_id = auth.uid() OR agent_id = auth.uid()))
  );

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 9. VERIFICATION REQUESTS
CREATE TABLE verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('agent','listing','document')),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  notes TEXT DEFAULT '',
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ DEFAULT NULL
);

ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own verification requests"
  ON verification_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all verifications"
  ON verification_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 10. VERIFICATION DOCUMENTS
CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES verification_requests(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own documents"
  ON verification_documents FOR SELECT USING (
    EXISTS (SELECT 1 FROM verification_requests WHERE id = request_id AND user_id = auth.uid())
  );

-- 11. BLOG POSTS
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  author TEXT DEFAULT 'Property 9ja',
  image TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog posts are public" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 12. CONTACT MESSAGES
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read contact messages"
  ON contact_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 13. AGENT LEADS
CREATE TABLE agent_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lead_name TEXT DEFAULT '',
  lead_email TEXT DEFAULT '',
  lead_phone TEXT DEFAULT '',
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE agent_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents can view own leads"
  ON agent_leads FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Anyone can submit leads"
  ON agent_leads FOR INSERT WITH CHECK (true);

-- 14. VISITOR LOGS (anonymous)
CREATE TABLE visitor_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  timestamp TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log visits" ON visitor_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view logs" ON visitor_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 15. NEWSLETTER SUBSCRIBERS
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ============== Functions ==============

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
