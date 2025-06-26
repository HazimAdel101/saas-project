import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { NotificationBanner } from '@/components/ui/NotificationBanner';

export default function Home() {
  const t = useTranslations();
  const { rtl, isRTL } = useDirection();

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('hero.title'),
      description: t('hero.subtitle')
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('features.featuredProducts'),
      description: t('hero.subtitle')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('stats.activeUsers'),
      description: t('hero.subtitle')
    }
  ];

  const stats = [
    { number: '50K+', label: t('stats.activeUsers') },
    { number: '200+', label: t('stats.premiumTools') },
    { number: '99.9%', label: t('stats.uptime') },
    { number: '24/7', label: t('footer.support') }
  ];

  return (
    <div className="min-h-screen">
      <NotificationBanner />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20"></div>
        <div className="relative container mx-auto px-4 lg:px-6">
          <div className={`max-w-4xl mx-auto text-center ${rtl('text-right', 'text-left')} lg:text-center`}>
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Star className={`h-3 w-3 ${rtl('ml-1', 'mr-1')}`} />
              {t('hero.newFeature')}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              {t('hero.subtitle')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in ${rtl('sm:flex-row-reverse')}`}>
              <Button size="lg" className="btn-professional bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl">
                {t('hero.getStarted')}
                <ArrowRight className={`h-4 w-4 ${rtl('mr-2 rotate-180', 'ml-2')}`} />
              </Button>
              <Button variant="outline" size="lg" className="btn-professional">
                {t('hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center ${rtl('text-right', 'text-left')} lg:text-center`}>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className={`text-center mb-16 ${rtl('text-right', 'text-left')} lg:text-center`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('features.featuredProducts')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
                <CardHeader className={rtl('text-right', 'text-left')}>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className={rtl('text-right', 'text-left')}>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
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
              <Button size="lg" variant="secondary" className="btn-professional bg-white text-purple-600 hover:bg-white/90">
                {t('hero.getStarted')}
                <CheckCircle className={`h-4 w-4 ${rtl('mr-2', 'ml-2')}`} />
              </Button>
              <Button size="lg" variant="outline" className="btn-professional border-white text-white hover:bg-white/10">
                {t('navigation.contact')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
