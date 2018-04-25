(function() {
  // Declarando variáveis
  let array = [],
    isFirefox = typeof InstallTrigger !== 'undefined';

  for (let value of document.images) {
    array.push(value.src);
  }

  // Checando
  jdetects.create(function(status) {
    //Excessão do firefox
    if (isFirefox) {
      return;
    }

    switch (status) {
      case 'on':
        removeSrc();
        break;

      case 'off':
        addSrc();
        break;
    }
  });

  window.addEventListener('resize', () => {
    //Excessão do firefox
    if (isFirefox) {
      let devtools = {
          open: false,
          orientation: null
        },
        threshold = 160,
        widthThreshold = window.outerWidth - window.innerWidth > threshold,
        heightThreshold = window.outerHeight - window.innerHeight > threshold,
        orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (
        !(heightThreshold && widthThreshold) &&
        ((window.Firebug &&
          window.Firebug.chrome &&
          window.Firebug.chrome.isInitialized) ||
          widthThreshold ||
          heightThreshold)
      ) {
        removeSrc();
      } else {
        addSrc();
      }
    }
  });

  function removeSrc() {
    if (!document.images[0].src.includes('no-avatar-new.svg')) {
      for (let value of document.images) {
        value.src = 'images/no-avatar-new.svg';
      }
    }
  }

  function addSrc() {
    if (document.images[0].src.includes('no-avatar-new.svg')) {
      for (let [index, value] of array.entries()) {
        document.images[index].src = value;
      }
    }
  }
})();
