
import React, { useState, useEffect, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
interface SlideData {
  id: number;
  backgroundImage: string;
  content: React.ReactNode;
}

// --- HELPER COMPONENTS (defined outside App to prevent re-creation) ---

const GlassBox: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
  <div className={`glass-box bg-glass-bg backdrop-blur-2xl border border-glass-border p-6 md:p-10 rounded-2xl shadow-2xl max-w-7xl w-[95%] max-h-[90vh] overflow-y-auto animate-slideUp ${className}`}>
    {children}
  </div>
);

const H1: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className='' }) => (
    <h1 className={`font-oswald text-3xl md:text-5xl uppercase tracking-wider mb-5 text-white border-b-[3px] border-primary inline-block pb-2.5 text-shadow-lg ${className}`}>
        {children}
    </h1>
);

const H3: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className='' }) => (
    <h3 className={`text-xl md:text-2xl text-accent mb-3 font-bold text-shadow ${className}`}>{children}</h3>
);

const StyledList: React.FC<{items: React.ReactNode[]}> = ({ items }) => (
    <ul className="space-y-3">
        {items.map((item, index) => (
            <li key={index} className="flex items-start text-lg">
                <span className="text-primary mr-3 mt-1.5 text-sm">➤</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const PriceBars: React.FC<{ level: 1 | 2 | 3 }> = ({ level }) => {
    const isHigh = level === 3;
    return (
        <div className="mt-4">
            <p className="mb-2">Price Point: {isHigh ? 'High' : 'Affordable'}</p>
            <div className="flex gap-1.5">
                <div className={`h-2 flex-1 rounded-sm ${level >= 1 ? (isHigh ? 'bg-danger' : 'bg-success') : 'bg-white/20'}`}></div>
                <div className={`h-2 flex-1 rounded-sm ${level >= 2 ? (isHigh ? 'bg-danger' : 'bg-success') : 'bg-white/20'}`}></div>
                <div className={`h-2 flex-1 rounded-sm ${level >= 3 ? (isHigh ? 'bg-danger' : 'bg-success') : 'bg-white/20'}`}></div>
            </div>
        </div>
    );
};

// --- SLIDE DATA ---

const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920&auto=format&fit=crop",
    content: (
      <div className="text-center max-w-4xl animate-fadeIn">
        <p className="tracking-[8px] text-accent font-extrabold uppercase">New Media Strategy</p>
        <h1 className="font-oswald text-7xl md:text-9xl border-none my-2 text-shadow-xl" style={{textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(0, 130, 195, 0.5), 0 0 50px rgba(0, 130, 195, 0.4), 0 0 100px rgba(0, 130, 195, 0.2)'}}>DECATHLON</h1>
        <div className="h-1.5 w-36 bg-primary mx-auto my-5"></div>
        <p className="font-extrabold text-2xl md:text-3xl text-shadow-lg">Making Sports Accessible for Everyone</p>
        <div className="mt-16 text-xl bg-black/50 px-8 py-3 rounded-full border border-white/30 inline-block">Presented by Mehmet Akif Ayvacık</div>
      </div>
    ),
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <div className="flex items-center gap-4">
            <H1 className="mb-0 border-b-0 pb-0">1. Brand Introduction</H1>
            <div className="bg-white text-primary px-3 py-1 font-oswald text-2xl tracking-wider shadow-lg">DECATHLON</div>
        </div>
        <div className="w-full h-[3px] bg-primary mt-2 mb-5"></div>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div>
            <H3>Identity & Scale</H3>
            <StyledList items={[
                <><strong>Founded:</strong> Late 20th Century (France).</>,
                <><strong>Mission:</strong> Making sports goods available for everyone.</>,
                <><strong>Global Reach:</strong> 1,500+ stores, 100,000+ employees globally.</>
            ]} />
          </div>
          <div>
            <H3>Core Value Proposition</H3>
            <StyledList items={[
                <><strong>Product Range:</strong> 80+ sports (Fishing to Hiking).</>,
                <><strong>Target Audience:</strong> No age limit. From 5-year-olds to 70-year-olds.</>,
                <><strong>Motto:</strong> "Sport for All - All for Sport"</>
            ]} />
          </div>
        </div>
      </GlassBox>
    ),
  },
    {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>2. Industry & Sector Overview</H1>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div>
            <H3>Market Definition</H3>
            <StyledList items={[
              <><strong>Industry:</strong> Sporting Goods Retail.</>,
              <><strong>Market Size:</strong> A multi-billion dollar global market, with significant growth in e-commerce.</>,
              <><strong>Key Trend:</strong> Increasing focus on health, wellness, and athleisure.</>,
            ]} />
          </div>
          <div>
            <H3>Digital Trends</H3>
            <StyledList items={[
              <><strong>E-commerce Dominance:</strong> Online sales are rapidly growing.</>,
              <><strong>Consumer Behavior:</strong> Shift towards sustainable and ethically produced goods.</>,
              <><strong>Technology:</strong> Rise of community-based fitness apps and online tutorials.</>,
            ]} />
          </div>
        </div>
      </GlassBox>
    ),
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>3. Competitive Landscape</H1>
        <p className="text-lg text-white/90">Direct Comparison with Industry Titans</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20 transition-all duration-300 hover:-translate-y-2 hover:border-primary/70">
            <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600')"}}>
              <div className="relative w-full h-full p-4 flex items-end">
                  <h2 className="font-oswald text-4xl text-white text-shadow-lg">NIKE</h2>
              </div>
            </div>
            <div className="p-5">
              <p><strong>Strategy:</strong> Heroism & Star Athletes.</p>
              <PriceBars level={3} />
            </div>
          </div>
          <div className="bg-white/10 rounded-xl overflow-hidden border-[3px] border-primary transition-all duration-300 transform scale-105 shadow-2xl z-10">
            <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1531326262705-02674a654289?q=80&w=600')"}}>
               <div className="relative w-full h-full p-4 flex items-end">
                  <h2 className="font-oswald text-4xl text-primary bg-white px-2 py-0.5">DECATHLON</h2>
              </div>
            </div>
            <div className="p-5 bg-primary/20">
              <p><strong>Strategy:</strong> Functional & Accessible.</p>
              <PriceBars level={1} />
            </div>
          </div>
          <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20 transition-all duration-300 hover:-translate-y-2 hover:border-primary/70">
            <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=600')"}}>
              <div className="relative w-full h-full p-4 flex items-end">
                  <h2 className="font-oswald text-4xl text-white text-shadow-lg">ADIDAS</h2>
              </div>
            </div>
            <div className="p-5">
              <p><strong>Strategy:</strong> Lifestyle & Culture.</p>
              <PriceBars level={3} />
            </div>
          </div>
        </div>
      </GlassBox>
    ),
  },
   {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>4. Digital Presence Analysis</H1>
        <h2 className="font-oswald text-3xl text-primary mb-4">Current State: "Fragmented"</h2>
        <p className="text-lg mb-4">Multiple accounts, different languages, disconnected strategy.</p>
        <StyledList items={[
          <><strong>Platforms:</strong> Instagram, X (Twitter), Facebook, YouTube, Website.</>,
          <><strong>Website:</strong> Strong e-commerce, but segmented by country.</>,
          <><strong>Content Issue:</strong> Cross-posting same content without adaptation.</>,
        ]}/>
        <div className="bg-danger/20 border border-danger p-5 rounded-xl mt-6">
          <h3 className="text-2xl font-bold text-[#ff6b6b]"><i className="fas fa-exclamation-triangle mr-2"></i> Key Weakness: Ghost Views</h3>
          <p className="mt-2 text-lg">A viral reel in Turkey gained 5M+ views but only ~1,300 likes, indicating high reach but low resonance due to ineffective targeting.</p>
        </div>
      </GlassBox>
    ),
  },
  {
    id: 6,
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>5. SWOT Analysis</H1>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div className="p-5 bg-white/5 border-l-4 border-success"><h3 className="text-success font-bold text-2xl mb-2">STRENGTHS</h3><StyledList items={["Unbeatable price/quality.", "Global store network.", "Wide product range."]}/></div>
            <div className="p-5 bg-white/5 border-l-4 border-danger"><h3 className="text-danger font-bold text-2xl mb-2">WEAKNESSES</h3><StyledList items={["Fragmented digital accounts.", "Low engagement rates.", "Brand perception as 'cheap'."]}/></div>
            <div className="p-5 bg-white/5 border-l-4 border-primary"><h3 className="text-primary font-bold text-2xl mb-2">OPPORTUNITIES</h3><StyledList items={["TikTok for Gen-Z reach.", "Global English-speaking community.", "Leverage UGC for authenticity."]}/></div>
            <div className="p-5 bg-white/5 border-l-4 border-orange-500"><h3 className="text-orange-500 font-bold text-2xl mb-2">THREATS</h3><StyledList items={["Nike/Adidas digital dominance.", "Fast fashion sportswear.", "Niche, specialized brands."]}/></div>
        </div>
      </GlassBox>
    ),
  },
  {
    id: 7,
    backgroundImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>6. SMART Goals</H1>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div className="bg-primary/10 p-5 rounded-lg border border-primary"><H3>1. Instagram Engagement</H3><p className="text-lg">Increase ER from 2% to <strong>4%</strong> within 6 months.</p></div>
            <div className="bg-primary/10 p-5 rounded-lg border border-primary"><H3>2. TikTok Growth</H3><p className="text-lg">Gain <strong>50,000 new organic followers</strong> by Q4.</p></div>
            <div className="bg-primary/10 p-5 rounded-lg border border-primary"><H3>3. Instagram Growth</H3><p className="text-lg">Achieve <strong>100,000 followers</strong> on Instagram within 1 year.</p></div>
            <div className="bg-primary/10 p-5 rounded-lg border border-primary"><H3>4. Community Support</H3><p className="text-lg">Resolve <strong>90%</strong> of X/Twitter queries within 1 hour.</p></div>
        </div>
      </GlassBox>
    ),
  },
  {
    id: 8,
    backgroundImage: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>7. Content Strategy</H1>
        <p className="text-lg">Our goal is to stop cross-posting and create platform-specific, engaging content.</p>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div><H3>Content Pillars</H3><StyledList items={["Education: How-to use gear, sport tutorials.", "Innovation: Behind-the-scenes lab tests.", "Community: User-Generated Content (UGC)."]}/></div>
            <div><H3>Tone of Voice</H3><StyledList items={["Helpful & Encouraging: Empowering all athletes.", "Authentic & Fun: Celebrating the joy of sport.", "Informative: Clear and practical advice."]}/></div>
        </div>
      </GlassBox>
    ),
  },
  {
    id: 9,
    backgroundImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1920&auto=format&fit=crop",
    content: (
      <GlassBox>
        <H1>7. Content Strategy (Platform Examples)</H1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div><H3><i className="fab fa-instagram mr-2"></i> Instagram</H3><p className="text-lg">Focus on high-quality visuals. Use Reels for product showcases and inspiring user stories. Polished and aesthetic.</p></div>
            <div><H3><i className="fab fa-tiktok mr-2"></i> TikTok</H3><p className="text-lg">Focus on trends and fun. Use popular sounds and challenges to engage a younger audience (Gen-Z) with authentic, fast-paced content.</p></div>
            <div><H3><i className="fab fa-youtube mr-2"></i> YouTube</H3><p className="text-lg">Focus on long-form education. Create "How-To" series and event vlogs. Switch main content language to English to build a global community.</p></div>
            <div><H3><i className="fab fa-twitter mr-2"></i> X (Twitter)</H3><p className="text-lg">Focus on community support and real-time engagement. Launch a "DecathlonHelp" account and comment on live sports events.</p></div>
        </div>
      </GlassBox>
    ),
  },
   {
    id: 10,
    backgroundImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1920&auto=format&fit=crop",
    content: <GlassBox><h1 className="font-oswald text-3xl md:text-5xl uppercase tracking-wider mb-5 border-b-[3px] inline-block pb-2.5" style={{color: '#1DA1F2', borderColor: '#1DA1F2'}}>X (Twitter) Strategy</h1><h2 className="font-oswald text-3xl text-white mb-4">Focus: Official & Community Support</h2><StyledList items={["Customer Support: Launch 'Decathlon Help'. Respond directly to client issues.", "Community: Create threads where customers help each other.", "Real-Time: Comment on major sports events (Olympics, Marathons)."]} /></GlassBox>,
  },
  {
    id: 11,
    backgroundImage: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1920&auto=format&fit=crop",
    content: <GlassBox><h1 className="font-oswald text-3xl md:text-5xl uppercase tracking-wider mb-5 text-transparent bg-clip-text border-b-[3px] inline-block pb-2.5" style={{backgroundImage: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', borderColor: '#dc2743'}}>Instagram Strategy</h1><h2 className="font-oswald text-3xl text-white mb-4">Focus: Visual Excellence</h2><StyledList items={["High Quality: Short videos about products and event highlights.", "Events: Well-edited posts about marathons or special campaigns.", "Aesthetic: Polished, inspiring, vibrant."]} /></GlassBox>,
  },
  {
    id: 12,
    backgroundImage: "https://wallpapers.com/images/featured/tiktok-logo-98vku1w29x2enwhu.webp",
    content: <GlassBox><h1 className="font-oswald text-3xl md:text-5xl uppercase tracking-wider mb-5 border-b-[3px] inline-block pb-2.5" style={{color: '#69C9D0', borderColor: '#69C9D0'}}>TikTok Strategy</h1><h2 className="font-oswald text-3xl text-white mb-4">Focus: Trends & Youth</h2><StyledList items={["Trend-Based: Use popular sounds and challenges immediately.", "Creative Edits: Fast-paced, engaging, authentic.", "Target: Reach younger audiences (Gen-Z)."]} /></GlassBox>,
  },
  {
    id: 13,
    backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
    content: <GlassBox><h1 className="font-oswald text-3xl md:text-5xl uppercase tracking-wider mb-5 border-b-[3px] inline-block pb-2.5" style={{color: '#FF0000', borderColor: '#FF0000'}}>YouTube Strategy</h1><h2 className="font-oswald text-3xl text-white mb-4">Focus: Education & Vlogs</h2><StyledList items={["Vlog Style: Behind-the-scenes at events.", "How-To Series: 5–10 minute videos (e.g., 'How to set up a tent').", "Global: Switch main content to English."]} /></GlassBox>,
  },
  {
    id: 14,
    backgroundImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1920&auto=format&fit=crop",
    content: (
        <GlassBox>
            <H1>8. Digital Media Calendar</H1>
            <p className="text-lg">Proposed weekly posting frequency for each platform.</p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#d62976]"><h3 className="font-oswald text-2xl mb-2 flex items-center gap-3"><i className="fab fa-instagram text-2xl text-[#d62976]"></i> Instagram</h3><span className="block text-accent font-bold mb-2">3x Reels & Stories per Week</span><StyledList items={["Product Highlights, UGC Reposts, Event Teasers."]}/></div>
                <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#69C9D0]"><h3 className="font-oswald text-2xl mb-2 flex items-center gap-3"><i className="fab fa-tiktok text-2xl text-[#69C9D0]"></i> TikTok</h3><span className="block text-accent font-bold mb-2">3x Trend Videos per Week</span><StyledList items={["Viral Challenges, Funny Fails, Relatable Sports Content."]}/></div>
                <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#FF0000]"><h3 className="font-oswald text-2xl mb-2 flex items-center gap-3"><i className="fab fa-youtube text-2xl text-[#FF0000]"></i> YouTube</h3><span className="block text-accent font-bold mb-2">2x Long Videos per Month</span><StyledList items={["1 'How-To' Tutorial, 1 Event Vlog / Adventure Story."]}/></div>
                <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#1DA1F2]"><h3 className="font-oswald text-2xl mb-2 flex items-center gap-3"><i className="fab fa-twitter text-2xl text-[#1DA1F2]"></i> X (Twitter)</h3><span className="block text-accent font-bold mb-2">Daily Community Engagement</span><StyledList items={["'Decathlon Help' Replies, Sports Commentary, Polls."]}/></div>
            </div>
        </GlassBox>
    ),
  },
  {
    id: 15,
    backgroundImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1920&auto=format&fit=crop",
    content: (
        <GlassBox>
            <H1>9. Advertising Strategy</H1>
            <p className="text-lg">A Simple "Customer Journey" Funnel</p>
            <p className="mt-4 text-xl"><strong>Target Audience:</strong> Urban Dwellers, 18-45, Fitness Enthusiasts, Families.</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-8 text-center">
                <div className="bg-white/10 p-6 rounded-xl border-b-4 border-primary flex-1 w-full"><i className="fab fa-tiktok text-5xl text-accent mb-4"></i><H3>1. AWARENESS</H3><p>User sees a viral Decathlon challenge or Spark Ad on TikTok & Instagram Reels.</p></div>
                <div className="text-3xl text-white/50 transform md:rotate-0 rotate-90">➜</div>
                <div className="bg-white/10 p-6 rounded-xl border-b-4 border-primary flex-1 w-full"><i className="fas fa-search-dollar text-5xl text-accent mb-4"></i><H3>2. CONSIDERATION</H3><p>User is retargeted with product-focused ads on Meta platforms and Google Display.</p></div>
                <div className="text-3xl text-white/50 transform md:rotate-0 rotate-90">➜</div>
                <div className="bg-white/10 p-6 rounded-xl border-b-4 border-primary flex-1 w-full"><i className="fas fa-shopping-cart text-5xl text-accent mb-4"></i><H3>3. CONVERSION</H3><p>User searches on Google (Search Ads) and buys on the Website.</p></div>
            </div>
        </GlassBox>
    ),
  },
  {
    id: 16,
    backgroundImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1920&auto=format&fit=crop",
    content: (
        <GlassBox>
            <H1>10. Digital Media Budget Plan</H1>
            <p className="text-lg">Proposed allocation for a quarterly campaign.</p>
            <div className="flex flex-col md:flex-row items-center justify-around gap-10 mt-8">
                <div className="w-64 h-64 rounded-full relative shadow-lg flex-shrink-0" style={{background: 'conic-gradient(#0082C3 0% 40%, #2ecc71 40% 70%, #9b59b6 70% 90%, #FFDA00 90% 100%)'}}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-glass-bg rounded-full"></div>
                </div>
                <div className="flex-1 max-w-lg space-y-4">
                    <div className="flex items-center text-xl"><div className="w-5 h-5 rounded-full mr-4 bg-primary"></div><span><strong>40% Production:</strong> High-quality video & shoots.</span></div>
                    <div className="flex items-center text-xl"><div className="w-5 h-5 rounded-full mr-4 bg-success"></div><span><strong>30% Paid Ads:</strong> Targeted Reach (Meta/Google).</span></div>
                    <div className="flex items-center text-xl"><div className="w-5 h-5 rounded-full mr-4 bg-[#9b59b6]"></div><span><strong>20% Influencers:</strong> Micro-influencers for niche sports.</span></div>
                    <div className="flex items-center text-xl"><div className="w-5 h-5 rounded-full mr-4 bg-accent"></div><span><strong>10% Tools:</strong> Community Management & Analytics.</span></div>
                </div>
            </div>
        </GlassBox>
    ),
  },
  {
    id: 17,
    backgroundImage: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1920&auto=format&fit=crop",
    content: (
        <GlassBox className="text-center">
            <H1>11. New Brand Positioning</H1>
            <p className="text-2xl leading-normal border border-primary p-6 rounded-lg mt-6">
               "For the everyday explorer, Decathlon is the global partner that makes sports accessible and fun."
            </p>
            <h2 className="font-oswald text-4xl text-white mt-8">WE CELEBRATE PLAYING, NOT JUST WINNING.</h2>
        </GlassBox>
    ),
  },
  {
    id: 18,
    backgroundImage: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1920&auto=format&fit=crop",
    content: (
      <div className="text-center animate-fadeIn">
        <h1 className="font-oswald text-7xl md:text-9xl border-none text-shadow-xl">THANK YOU</h1>
        <p className="text-3xl mt-4">Any Questions?</p>
        <div className="mt-8 text-2xl flex gap-6 justify-center items-center">
          <a href="https://www.instagram.com/decathlon/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><i className="fab fa-instagram"></i> @decathlon</a>
          <span className="text-white/50">|</span>
          <a href="https://www.decathlon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><i className="fas fa-globe"></i> decathlon.com</a>
        </div>
      </div>
    ),
  },
];


// --- APP COMPONENT ---

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  const progressPercentage = ((currentIndex + 1) / SLIDES_DATA.length) * 100;

  return (
    <div className="relative w-full h-full bg-dark">
      {SLIDES_DATA.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-10 md:p-16 bg-cover bg-center transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url(${slide.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40"></div>
          <div className="relative z-10 w-full flex justify-center items-center">
            {slide.content}
          </div>
        </div>
      ))}

      <div className="fixed top-5 md:top-8 right-5 md:right-8 z-50 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full font-oswald text-xl border-2 border-primary shadow-lg">
        <span className="text-accent font-bold text-2xl">{currentIndex + 1}</span> / {SLIDES_DATA.length}
      </div>

      <div className="fixed bottom-5 md:bottom-8 right-5 md:right-8 z-50 flex gap-4">
        <button onClick={prevSlide} className="nav-btn bg-primary text-white border-none px-7 py-3.5 rounded-full cursor-pointer font-oswald text-lg transition-all duration-300 ease-in-out shadow-lg hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-2xl">
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
        <button onClick={nextSlide} className="nav-btn bg-primary text-white border-none px-7 py-3.5 rounded-full cursor-pointer font-oswald text-lg transition-all duration-300 ease-in-out shadow-lg hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-2xl">
          Next <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      
      <div className="fixed bottom-0 left-0 h-1.5 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-300 ease-linear shadow-lg" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
}