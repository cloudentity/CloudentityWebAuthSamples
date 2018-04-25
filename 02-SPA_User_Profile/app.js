window.addEventListener('load', function() {

  // helpers

  var loginButton = document.getElementById('login-button');

  var logoutButton = document.getElementById('logout-button');

  var unauthorizedNav = document.getElementById('unauthorized-nav');

  var auhtorizedNav = document.getElementById('authorized-nav');

  var unauthorizedSection = document.getElementById('unauthorized-section');

  var auhtorizedSection = document.getElementById('authorized-section');

  var nameSpan = document.getElementById('user_name');

  var emailSpan = document.getElementById('user_email');

  function currentUrl () {
    // get URL without hash to avoid storing OAuth response as redirectUri
    return window.location.href.replace(/#.*$/, '');
  }

  function getExpirationTime (expiresIn) {
    return JSON.stringify(expiresIn * 1000 + new Date().getTime());
  }

  function tokenExpired () {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() >= expiresAt;
  }

  function setAuthSession (auth) {
    localStorage.setItem('access_token', auth.access_token);
    localStorage.setItem('expires_at', getExpirationTime(auth.expires_in));
  }

  function clearAuthSession () {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  var userProfile;

  function setProfile (profile) {
    userProfile = profile;
  }

  function updateUI () {
    if (tokenExpired()) {
      auhtorizedNav.style.display = 'none';
      auhtorizedSection.style.display = 'none';
      unauthorizedNav.style.display = 'block';
      unauthorizedSection.style.display = 'block';
    } else {
      auhtorizedNav.style.display = 'block';
      auhtorizedSection.style.display = 'block';
      unauthorizedNav.style.display = 'none';
      unauthorizedSection.style.display = 'none';

      nameSpan.innerText = userProfile.name;
      emailSpan.innerText = userProfile.email;
    }
  }


  // Cloudentity Web Auth usage

  var cloudentity = new CloudentityWebAuth({
    domain: CLOUDENTITY_SETTINGS.domain,
    clientId: CLOUDENTITY_SETTINGS.clientId,
    redirectUri: currentUrl(),
    scopes: ['openid', 'profile', 'email']
  });

  function login() {
    cloudentity.authorize();
  }

  function logout() {
    clearAuthSession();
    updateUI();
  }

  function getProfile() {
    cloudentity.userInfo(localStorage.getItem('access_token')).then(
      function (profile) {
        setProfile(profile);
        updateUI();
      },
      function (rejected) {
        if (rejected.error === 'Unauthorized') {
          clearAuthSession();
          userProfile = null;
          updateUI();
        } else {
          console.log(rejected);
        }
      });
  }

  loginButton.addEventListener('click', login);

  logoutButton.addEventListener('click', logout);

  cloudentity.getAuth().then(
    function (auth) {
      setAuthSession(auth);
      window.location.hash = '';
      getProfile();
    },
    function (err) {
      if (tokenExpired()) {
        clearAuthSession();
        updateUI();
      } else {
        getProfile();
      }
    }
  )
});