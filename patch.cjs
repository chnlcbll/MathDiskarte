const fs = require('fs');
let content = fs.readFileSync('src/components/IntroTour.tsx', 'utf8');

const utangTour = `
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
        },`;

content = content.replace(/element: '#tour-tawad-dashboard'/, utangTour + '\n        {\n          element: \'#tour-tawad-dashboard\'');
content = content.replace(/if \(callbacksRef.current.setMainTool\) callbacksRef.current.setMainTool\('tawadtactics'\);/g, (match, offset) => {
    // Only replace the one in tour-fire-tab, wait actually it's easier to just replace the first one.
    return match;
});

// Replace the specific one in tour-fire-tab:
content = content.replace(/element: '#tour-fire-tab',[\s\S]*?onNextClick: \(\) => {[\s\S]*?if \(callbacksRef.current.setMainTool\) callbacksRef.current.setMainTool\('tawadtactics'\);/, (match) => {
    return match.replace("if (callbacksRef.current.setMainTool) callbacksRef.current.setMainTool('tawadtactics');", "callbacksRef.current.setActiveTab('utang');");
});

fs.writeFileSync('src/components/IntroTour.tsx', content);
