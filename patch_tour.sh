#!/bin/bash
sed -i 's/              if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('\''tawadtactics'\'');/              callbacksRef.current.setActiveTab('\''utang'\'');/g' src/components/IntroTour.tsx

cat << 'INNER_EOF' >> src/components/IntroTour.tsx_append
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
INNER_EOF

# insert before the next element which is { element: '#tour-tawad-dashboard'
sed -i '/element: '\''#tour-tawad-dashboard'\''/e cat src/components/IntroTour.tsx_append' src/components/IntroTour.tsx

