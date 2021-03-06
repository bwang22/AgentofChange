console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification("This is an natural disaster alert", {
    body: 'There is a flood approaching. You need water and batteries.',
    icon: 'https://github.com/bwang22/AgentofChange/raw/master/flood.jpg'
  });
});
