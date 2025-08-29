import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Users, BookOpen, Sparkles, Download, Smartphone } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import FAQ from '@/components/FAQ';

export default function Index() {
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Check if app is already installed
    const checkInstalled = () => {
      // Check for standalone mode (PWA installed)
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstallable(false);
        return;
      }
      
      // Check for iOS Safari
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      
      setIsIOS(isIOSDevice);
      
      if (isIOSDevice && isSafari) {
        // Show manual install instructions for iOS
        setIsInstallable(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
    
    checkInstalled();
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', () => {
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } catch (error) {
      console.log('Install prompt failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center glow-primary">
                <Sparkles className="text-primary-foreground" size={20} />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-futuristic font-bold text-glow">
                  Tourism & Hospitality
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Saint Joseph College • AI Assistant
                </p>
              </div>
            </div>
            
            <div className="flex gap-1 sm:gap-2">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'outline'}
                onClick={() => setActiveTab('chat')}
                size="sm"
                className={`glow-border transition-all duration-300 ${
                  activeTab === 'chat' ? 'glow-primary bg-primary text-primary-foreground' : ''
                }`}
              >
                <MessageSquare size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Chat with Hestia</span>
                <span className="sm:hidden">Chat</span>
              </Button>
              <Button
                variant={activeTab === 'faq' ? 'default' : 'outline'}
                onClick={() => setActiveTab('faq')}
                size="sm"
                className={`glow-border transition-all duration-300 ${
                  activeTab === 'faq' ? 'glow-primary bg-primary text-primary-foreground' : ''
                }`}
              >
                <BookOpen size={16} className="mr-1 sm:mr-2" />
                FAQ
              </Button>
              {isInstallable && (
                <Button
                  variant="outline"
                  onClick={handleInstallClick}
                  size="sm"
                  className="glow-border transition-all duration-300"
                >
                  <Download size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Install</span>
                  <span className="sm:hidden">App</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Show only when FAQ tab is active or on desktop */}
      {activeTab === 'faq' && (
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-futuristic font-bold mb-4 sm:mb-6 text-glow leading-tight">
              Welcome to the Future of
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Education Assistance
              </span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Meet Hestia, your intelligent Tourism & Hospitality Department assistant at Saint Joseph College. 
              Get instant answers about BSTM & BSHM programs, partnerships, and career opportunities.
            </p>
            
                      {/* Install Buttons */}
          {isInstallable && (
            <div className="flex flex-col gap-4 justify-center items-center mb-6 sm:mb-8">
              {/* Android/Chrome Install */}
              {!isIOS && deferredPrompt && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleInstallClick}
                  className="glow-border transition-all duration-300 w-full sm:w-auto min-w-48"
                >
                  <Smartphone size={20} className="mr-2" />
                  Install on Mobile
                </Button>
              )}
              
              {/* iOS Safari Instructions */}
              {isIOS && (
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    To install on iOS Safari:
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>1. Tap the Share button <span className="text-primary">⎋</span></p>
                    <p>2. Scroll down and tap "Add to Home Screen"</p>
                    <p>3. Tap "Add" to install</p>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground text-center">
                Available for iOS & Android
              </p>
            </div>
          )}
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
              <Card className="p-4 sm:p-6 glow-border bg-card/80 backdrop-blur-sm hover:glow-subtle transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-futuristic font-bold text-base sm:text-lg">2 Programs</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">BSTM & BSHM</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 sm:p-6 glow-border bg-card/80 backdrop-blur-sm hover:glow-subtle transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-futuristic font-bold text-base sm:text-lg">3+ Partners</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Industry Leaders</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 sm:p-6 glow-border bg-card/80 backdrop-blur-sm hover:glow-subtle transition-all duration-300 sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-primary" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-futuristic font-bold text-base sm:text-lg">AI Powered</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">24/7 Support</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Main Content - Chat appears immediately when chat tab is active */}
      <section className={`${activeTab === 'chat' ? 'pt-4 sm:pt-6' : 'py-6 sm:py-8'} px-4 sm:px-6`}>
        <div className="container mx-auto">
          {activeTab === 'chat' ? <ChatBot /> : <FAQ />}
        </div>
      </section>

      {/* Floating Install Button for Mobile */}
      {isInstallable && (
        <div className="fixed bottom-4 right-4 z-50 sm:hidden">
          <Button
            variant="default"
            size="sm"
            onClick={handleInstallClick}
            className="glow-primary bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg"
          >
            <Download size={16} className="mr-2" />
            Install
          </Button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 backdrop-blur-sm py-6 sm:py-8 px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-2">
            © 2024 Tourism & Hospitality Department • Saint Joseph College
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            <a 
              href="https://www.facebook.com/sjc.cthm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-colors duration-300"
            >
              Facebook Page
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Hestia AI • Developed by Group AUZA
          </p>
        </div>
      </footer>
    </div>
  );
}