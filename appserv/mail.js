

var allMail = exports.allMail = [];

for (var i = 0; i < 10; i++) {
  allMail.push({
    'eid': i,
    'to': 'Alice',
    'from': 'Bob',
    'subject': 'Hacker News',
    'body': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim, leo non ultrices mattis, dui nisl pharetra tellus, id ornare enim massa et est. Integer quis erat nec neque ultricies faucibus vitae ornare odio. Sed fringilla mi in ante ultricies vestibulum. Aliquam tempus risus non mauris pharetra ac ullamcorper ligula aliquam. Cras purus urna, pellentesque et consequat vitae, tincidunt vel risus. Cras augue tortor, posuere ut scelerisque mattis, viverra at lectus. Morbi imperdiet mollis nibh, et scelerisque dui ornare non. Sed nec malesuada urna. Vivamus a porta neque. Nam non risus nunc. Sed vitae euismod leo. Sed porta pharetra mauris vel aliquam. Etiam eget lorem lectus. Proin vitae tellus eros. Curabitur egestas fermentum mi a lobortis. Suspendisse erat purus, mollis eget lobortis vel, fermentum sit amet ante."
  });
}