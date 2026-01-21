(function (window) {
  /**
   * It holds consent listeners
   */
  const consentListeners = [];

  /**
   * It holds consent initializer listeners
   * until being called
   */
  const initUserConsentListeners = [];

  /**
   * Indicates whether consent is initialized
   */
  let initialized = false;

  /**
   * It holds consent initialize data if exists
   */
  let initConsentData = undefined;

  /**
   * Append a listener to be called whenever
   * a consent is posted
   *
   * @param {Function} callback Function called on event trigger
   */
  window.addConsentListener = (callback) => {
    consentListeners.push(callback);
  };

  /**
   * Append a listener to be called on consent init
   *
   * @param {import('./ConsentBanner').InitUserConsentCallback} callback Function called on event trigger
   */
  window.addInitUserConsentListener = (callback) => {
    if (initialized) {
      callback(initConsentData);
    } else {
      initUserConsentListeners.push(callback);
    }
  };

  /**
   * It triggers init consent
   *
   * @param {import('./ConsentBanner').Consent} consent Serialized
   * consent
   */
  window.initUserConsent = (consent) => {
    initialized = true;
    initConsentData = consent;
    while (initUserConsentListeners.length) {
      const callback = initUserConsentListeners.shift();
      callback(consent);
    }
  };

  /**
   * It posts user consent
   *
   * @param {import('../../components/ConsentBanner').Consent} consent Serialized
   * consent
   */
  window.postUserConsent = (consent) => {
    consentListeners.forEach((callback) => {
      callback(consent);
    });
  };
})(window);
