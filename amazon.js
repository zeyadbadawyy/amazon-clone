
 let notif=0;
 
      setInterval(function() {
        if (document.title === 'App') {
          document.title = `(${notif}) New messages`;
        } else {
          document.title = 'App';
        }
      }, 1000);