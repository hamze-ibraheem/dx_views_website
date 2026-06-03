import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
}

export default function IndustryHeadlines({ lang }: { lang: 'ar' | 'en' }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isRTL = lang === 'ar';

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://blog.playstation.com/feed/`);
      
      if (!response.ok) {
        throw new Error(`API returned an error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.status === 'ok' && data.items) {
        const playstationArticles = data.items.map((item: any) => ({
          title: item.title,
          description: item.description,
          url: item.link,
          // Extract an image from content if thumbnail is empty
          image: item.thumbnail || 
                 item.enclosure?.link || 
                 (item.content && item.content.match(/<img[^>]+src=(?:'|")([^'">]+)(?:'|")/i) ? item.content.match(/<img[^>]+src=(?:'|")([^'">]+)(?:'|")/i)[1] : '') ||
                 (item.description && item.description.match(/<img[^>]+src=(?:'|")([^'">]+)(?:'|")/i) ? item.description.match(/<img[^>]+src=(?:'|")([^'">]+)(?:'|")/i)[1] : '') ||
                 'https://images.unsplash.com/photo-1606144042851-9ef2136e05ad?q=80&w=2070&auto=format&fit=crop',
          publishedAt: item.pubDate,
          source: { name: 'PlayStation Blog' }
        })).slice(0, 4);
        setArticles(playstationArticles);
      } else {
        throw new Error('No articles found.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [lang]);

  return (
    <section className="py-24 relative" id="headlines-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <div className={`flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse justify-start' : 'justify-start'}`}>
              <Newspaper className="w-6 h-6 text-gaming-cyan" />
              <span className="font-mono text-sm tracking-[0.2em] font-bold text-gaming-cyan uppercase">
                {lang === 'ar' ? "[ أحدث الأخبار ]" : "[ INDUSTRY HEADLINES ]"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider title-glow">
              {lang === 'ar' ? "اخبار العاب الفيديو" : "Lobby Newsfeed"}
            </h2>
          </div>
          <button 
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {lang === 'ar' ? "تحديث" : "Refresh"}
          </button>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/20 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{lang === 'ar' ? "يتطلب إعدادات" : "Configuration Required"}</h3>
            <p className="text-gray-400 max-w-lg mx-auto font-mono text-sm">
              {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-panel p-4 rounded-2xl animate-pulse flex flex-col h-full border border-white/5">
                  <div className="w-full h-40 bg-white/5 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-white/10 rounded w-full mb-2"></div>
                  <div className="h-6 bg-white/10 rounded w-2/3"></div>
                </div>
              ))
            ) : articles.length > 0 ? (
              articles.map((article, idx) => (
                <motion.a 
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-panel group rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full hover:border-gaming-blue hover:shadow-xl hover:shadow-gaming-blue/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    {/* Fallback pattern if image is missing */}
                    <div className="absolute inset-0 bg-gaming-dark bg-grid-white/[0.05]" />
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 z-10"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('unsplash.com')) {
                            target.src = 'https://images.unsplash.com/photo-1629429408209-1fec9a1f2868?q=80&w=2070&auto=format&fit=crop';
                          } else {
                            target.style.display = 'none';
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] to-transparent z-20" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col relative z-30">
                    <div className="flex items-center justify-between text-xs font-mono text-gaming-cyan mb-3">
                      <span>{article.source.name}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    <h3 className="text-white font-bold leading-tight mb-3 line-clamp-3 group-hover:text-gaming-cyan transition-colors" dir="auto">
                      {article.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-end text-xs font-mono text-gray-500 group-hover:text-gaming-blue transition-colors">
                      <span className="mr-2">{lang === 'ar' ? "قراءة المزيد" : "READ MORE"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-400 font-mono">
                {lang === 'ar' ? "لم يتم العثور على مقالات جارية." : "No active headlines found."}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
