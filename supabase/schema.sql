-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_1_name TEXT NOT NULL,
    partner_2_name TEXT NOT NULL,
    event_date DATE NOT NULL,
    location TEXT NOT NULL,
    event_types TEXT[] NOT NULL,
    guest_count TEXT NOT NULL,
    package_level TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    source TEXT NOT NULL, -- e.g., 'homepage_guide', 'booking_form'
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unavailable_dates table
CREATE TABLE IF NOT EXISTS unavailable_dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) - Basic Setup
-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE unavailable_dates ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for bookings and subscribers
CREATE POLICY "Allow anon insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert for subscribers" ON subscribers FOR INSERT WITH CHECK (true);

-- Allow anonymous reads for unavailable dates (to show on calendar)
CREATE POLICY "Allow anon read for unavailable_dates" ON unavailable_dates FOR SELECT USING (true);
CREATE POLICY "Allow anon read for bookings (dates only)" ON bookings FOR SELECT USING (true);
