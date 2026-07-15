import React, { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';


interface Props {
  onClose: () => void;
  setAppView: (view: 'dashboard' | 'calculator') => void;
  setActiveTab: (tab: 'tbond' | 'mp2' | 'compare' | 'goalseek' | 'fire') => void;
  switchTheme: () => void;
  setHelpOpen: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setMainTool?: (tool: 'home' | 'ipontubo' | 'tawadtactics' | 'tamaba') => void;
}

export const IntroTour: React.FC<Props> = ({ onClose, setAppView, setActiveTab, switchTheme, setHelpOpen, setSidebarOpen, setMainTool }) => {
  const callbacksRef = React.useRef({ onClose, setAppView, setActiveTab, switchTheme, setHelpOpen, setSidebarOpen, setMainTool });

  useEffect(() => {
    callbacksRef.current = { onClose, setAppView, setActiveTab, switchTheme, setHelpOpen, setSidebarOpen, setMainTool };
  });

  useEffect(() => {
    const tourDriver = driver({
      showProgress: true,
      animate: true,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      doneBtnText: 'Finish',
      progressText: '{{current}} of {{total}}',
      popoverClass: 'driver-popover-custom',
      onPopoverRender: () => {
        const popoverEl = document.querySelector('.driver-popover');
        if (!popoverEl) return;
        const closeBtn = popoverEl.querySelector('.driver-popover-close-btn');
        const prevBtn = popoverEl.querySelector('.driver-popover-prev-btn');
        const navBtns = popoverEl.querySelector('.driver-popover-navigation-btns');
        if (closeBtn && prevBtn && navBtns) {
           navBtns.insertBefore(closeBtn, prevBtn);
        }
      },
      steps: [
        {
          popover: {
            title: 'Welcome to MathDiskarte!',
            description: 'Your complete Filipino everyday math toolkit. Let\'s take a tour of all the features and tools available to you.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('home');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-tool-ipontubo',
          popover: {
            title: 'IponTubo',
            description: 'This is the first main tool. It helps you calculate and project the growth of your investments like MP2 and Retail Treasury Bonds.',
            side: "bottom", align: 'start'
          }
        },
        {
          element: '#tour-tool-tawadtactics',
          popover: {
            title: 'TawadTactics',
            description: 'The second tool utilizes Game Theory to analyze and improve your pricing strategies and negotiations in everyday scenarios like tiangge shopping or freelancing.',
            side: "bottom", align: 'start'
          }
        },
        {
          element: '#tour-tool-tamaba',
          popover: {
            title: 'TamaBa?',
            description: 'The third tool is a logic checker. It tests if promotional claims, rules, and conditions actually make logical sense using propositional logic.',
            side: "bottom", align: 'start',
            onNextClick: () => {
              if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('ipontubo');
              callbacksRef.current.setAppView('dashboard');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-welcome',
          popover: {
            title: 'IponTubo Dashboard',
            description: 'Welcome to the IponTubo dashboard. Here you can see a summary of all your monitored investments and potential returns.',
            side: "bottom", align: 'start'
          }
        },
        {
          element: '#tour-new-projection',
          popover: {
            title: 'Create Calculations',
            description: 'You can create new financial projections here. Let\'s explore the RTB calculator next!',
            side: "top", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setAppView('calculator');
              callbacksRef.current.setActiveTab('tbond');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-rtb-metrics',
          popover: {
            title: 'RTB Analysis & Inflation',
            description: 'Calculate your returns on Retail Treasury Bonds. You can even toggle the Inflation Adjuster to see your Real Return limit.',
            side: "top", align: 'center'
          }
        },
        {
          element: '#tour-quarterly-payout',
          popover: {
            title: 'Quarterly Dividends',
            description: 'Find out exactly how much you can expect to receive every 3 months after withholding tax.',
            side: "top", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setActiveTab('mp2');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-mp2-metrics',
          popover: {
            title: 'MP2 Analysis',
            description: 'For your Pag-IBIG MP2 tax-free compound growth, you can see your total accumulated dividends and principal sum.',
            side: "top", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setActiveTab('compare');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-compare-tab',
          popover: {
            title: 'RTB vs MP2',
            description: 'A side-by-side comparison between RTB and MP2 to help you decide which asset grows your wealth faster.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setActiveTab('goalseek');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-goalseek-tab',
          popover: {
            title: 'Goal-Seek Calculator',
            description: 'Switch to Goal-Seek mode to reverse-engineer your investments. Set a target amount and time horizon to find the required deposit.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setActiveTab('fire');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-fire-tab',
          popover: {
            title: 'F.I.R.E. Targeter',
            description: 'Calculate your path to Financial Independence. Find out how much you need to invest to cover your monthly expenses passively.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setActiveTab('utang');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-utang-tab',
          popover: {
            title: 'Debt Analyzer',
            description: 'Analyze informal "5-6" loans or credit card minimum payment traps to avoid predatory lending.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('tawadtactics');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-tawadtactics-scenarios',
          popover: {
            title: 'TawadTactics Presets',
            description: 'Now we are in TawadTactics! You can start by choosing from these preset scenarios representing common Filipino negotiation situations.',
            side: "bottom", align: 'center'
          }
        },
        {
          popover: {
            title: 'Analyzing Strategies',
            description: 'You can adjust the parameters on the left to see how different pricing moves affect the outcome in real-time.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('tamaba');
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-tamaba-presets',
          popover: {
            title: 'TamaBa? Presets',
            description: 'Welcome to TamaBa?. Select a preset rule here like Shopee Vouchers or Refund policies to test its logic.',
            side: "bottom", align: 'center'
          }
        },
        {
          popover: {
            title: 'Logic Checker Result',
            description: 'Fill out the conditions, and the tool will use mathematical propositional logic to prove if the claim is valid or if you lack information.',
            side: "bottom", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setSidebarOpen(true);
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-export-all-btn',
          popover: {
            title: 'Export All Saved',
            description: 'From the Sidebar, you can generate and export all your saved calculations into a single PDF folio!',
            side: "top", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setSidebarOpen(false);
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-theme-btn',
          popover: {
            title: 'Toggle Theme',
            description: 'Switch between light and dark mode for comfortable late-night crunching.',
            side: "left", align: 'start',
            onNextClick: () => {
              callbacksRef.current.switchTheme();
              setTimeout(() => tourDriver.moveNext(), 100);
            }
          }
        },
        {
          element: '#tour-mute-btn',
          popover: {
            title: 'Audio Toggle',
            description: 'You can easily mute or unmute the application sound effects here.',
            side: "left", align: 'start'
          }
        },
        {
          element: '#tour-help-btn',
          popover: {
            title: 'Help & Information',
            description: 'Need help? Click next to open our knowledge base for whichever tool you are currently using.',
            side: "left", align: 'start',
            onNextClick: () => {
              callbacksRef.current.setHelpOpen(true);
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-help-tabs',
          popover: {
            title: 'Knowledge Base',
            description: 'Inside here, you will find simulated Video Guides and comprehensive FAQs. Every tool has its own specific FAQs!',
            side: "bottom", align: 'center',
            onNextClick: () => {
              callbacksRef.current.setHelpOpen(false);
              setTimeout(() => tourDriver.moveNext(), 600);
            }
          }
        },
        {
          element: '#tour-logout-btn',
          popover: {
            title: 'Log Out',
            description: 'When you are done, log out of your session securely. That concludes our tour, enjoy MathDiskarte!',
            side: "left", align: 'start'
          }
        }
      ],
      onDestroyed: () => {
        callbacksRef.current.onClose();
      }
    });

    tourDriver.drive();

    return () => {
      try {
        tourDriver.destroy();
      } catch (e) {}
    };
  }, []); // Run only once

  return null;
};
