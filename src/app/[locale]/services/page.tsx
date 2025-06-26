import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Zap, Palette, Brain, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations();
  const { rtl } = useDirection();

  const services = [
    {
      id: 'chatgpt',
      title: t('services.chatgpt.title'),
      description: t('services.chatgpt.description'),
      price: 20,
      originalPrice: 25,
      icon: <Brain className="h-8 w-8" />,
      image: '/api/placeholder/400/300',
      features: [
        t('services.chatgpt.features.gpt4Access'),
        t('services.chatgpt.features.fasterResponse'),
        t('services.chatgpt.features.priorityAccess'),
        t('services.chatgpt.features.imageGeneration'),
        t('services.chatgpt.features.webBrowsing')
      ],
      rating: 4.9,
      reviewCount: 15420,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      id: 'canva',
      title: t('services.canva.title'),
      description: t('services.canva.description'),
      price: 15,
      originalPrice: 20,
      icon: <Palette className="h-8 w-8" />,
      image: '/api/placeholder/400/300',
      features: [
        t('services.canva.features.premiumTemplates'),
        t('services.canva.features.brandKit'),
        t('services.canva.features.backgroundRemover'),
        t('services.canva.features.magicResize'),
        t('services.canva.features.stockPhotos')
      ],
      rating: 4.8,
      reviewCount: 8930,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      id: 'gemini',
      title: t('services.gemini.title'),
      description: t('services.gemini.description'),
      price: 25,
      originalPrice: 30,
      icon: <Sparkles className="h-8 w-8" />,
      image: '/api/placeholder/400/300',
      features: [
        t('services.gemini.features.geminiUltra'),
        t('services.gemini.features.multimodalAnalysis'),
        t('services.gemini.features.advancedReasoning'),
        t('services.gemini.features.longContext'),
        t('services.gemini.features.googleWorkspace')
      ],
      rating: 4.7,
      reviewCount: 6750,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20"></div>
        <div className="relative container mx-auto px-4 lg:px-6">
          <div className={`max-w-4xl mx-auto text-center ${rtl('text-right', 'text-left')} lg:text-center`}>
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Zap className={`h-3 w-3 ${rtl('ml-1', 'mr-1')}`} />
              {t('features.featuredProducts')}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              {t('services.title')}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className={`service-card group hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-border overflow-hidden ${service.bgColor} animate-fade-in-delay-${index + 1}`}>
                <div className={`h-2 bg-gradient-to-r ${service.color} gradient-border`}></div>
                
                <CardHeader className={`${rtl('text-right', 'text-left')} pb-4`}>
                  <div className={`flex items-center gap-4 ${rtl('flex-row-reverse')}`}>
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                      <div className={`flex items-center gap-2 ${rtl('flex-row-reverse')}`}>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {service.rating} ({service.reviewCount.toLocaleString()} {t('product.reviews')})
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className={`${rtl('text-right', 'text-left')} space-y-6`}>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      {t('features.features')}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className={`flex items-center gap-3 ${rtl('flex-row-reverse')}`}>
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className={`flex items-center justify-between mb-4 ${rtl('flex-row-reverse')}`}>
                      <div className={`flex items-center gap-2 ${rtl('flex-row-reverse')}`}>
                        <span className="text-3xl font-bold">${service.price}</span>
                        <span className="text-muted-foreground">/{t('product.month')}</span>
                      </div>
                      {service.originalPrice && (
                        <div className={`flex items-center gap-2 ${rtl('flex-row-reverse')}`}>
                          <span className="text-sm text-muted-foreground line-through">${service.originalPrice}</span>
                          <Badge variant="destructive" className="text-xs">
                            {t('product.savings')} ${service.originalPrice - service.price}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className={`flex gap-3 ${rtl('flex-row-reverse')}`}>
                      <Button className={`flex-1 bg-gradient-to-r ${service.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                        {t('services.subscribeNow')}
                        <ArrowRight className={`h-4 w-4 ${rtl('mr-2 rotate-180', 'ml-2')}`} />
                      </Button>
                      <Button variant="outline" size="default">
                        {t('services.learnMoreAbout')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className={`max-w-3xl mx-auto text-center ${rtl('text-right', 'text-left')} lg:text-center`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('cta.subtitle')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${rtl('sm:flex-row-reverse')}`}>
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                {t('hero.getStarted')}
                <ArrowRight className={`h-4 w-4 ${rtl('mr-2 rotate-180', 'ml-2')}`} />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
