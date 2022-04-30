export const samplePosts = [
  {
    id: 1,
    tags: [{ tagKeyword: 'Soccer' }, { tagKeyword: 'Sports' }],
    postedByEmail: 'bpashia@hawk.iit.edu',
    postedById: 1,
    title: 'Soccer Practice',
    content: {
      body:
        'Recreational soccer practice for the intramural league. All are welcome! Schedule: Mondays and Thursdays at 6:00 PM',
      pictureAddress:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEnpuWtWRKvwBJuHrUPSzsrjj8y00EcFFSpw&usqp=CAU',
    },
    createdAt: new Date(),
  },
  {
    id: 2,
    tags: [
      { tagKeyword: 'Saxophone' },
      { tagKeyword: 'Music' },
      { tagKeyword: 'Commuity' },
    ],
    postedByEmail: 'bpashia@hawk.iit.edu',
    postedById: 1,
    title: 'Musicians Wanted For Band',
    content: {
      body:
        "Musicians are wanted for a new campus band. All genre's/styles are welcome as well as instruments. Please message if interested in joining.",
      pictureAddress: 'https://image.pngaaa.com/100/707100-middle.png',
    },
    createdAt: new Date(),
  },
  {
    id: 2,
    tags: [{ tagKeyword: 'Gardening' }, { tagKeyword: 'Community' }],
    postedByEmail: 'tempuser1@hawk.iit.edu',
    postedById: 2,
    title: 'Come Work in the IIT Community Garden!',
    content: {
      body:
        "A new community garden is being opened on Illinois Tech's Campus! We are looking for interested gardeners or anyone with a green thumb who would like to come help us with the planting crops this spring. Please message if interested! Thanks!",
      pictureAddress:
        'https://tillydesign.com/blog/wp-content/uploads/2021/03/vegetable-gardening-in-small-spaces-the-spruce-256x256.jpg',
    },
    createdAt: new Date('4/26/2022'),
  },
  {
    id: 3,
    tags: [{ tagKeyword: 'Academics' }, { tagKeyword: 'Study' }],
    postedByEmail: 'tempuser2@hawk.iit.edu',
    postedById: 3,
    title: 'CS 487 Study Group',
    content: {
      body:
        "Hello computer science students. I am looking for some classmates who would be interested in studying for the upcoming final. Let me know if you're interested.",
      pictureAddress:
        'https://i0.wp.com/thekeesh.com/wp-content/uploads/2017/12/computer-science-education.jpg?resize=256%2C256&ssl=1',
    },
    createdAt: new Date('4/20/2022'),
  },
  {
    id: 4,
    tags: [{ tagKeyword: 'Music' }, { tagKeyword: 'Social' }],
    postedByEmail: 'tempuser1@hawk.iit.edu',
    postedById: 2,
    title: 'Smash Mouth Concert',
    content: {
      body:
        "Hey now, you're an allstar! A group of us cool architecture students are going to see the critically acclaimed band Smash Mouth in Indiana this weekend and would like to know if anyone is interested in joining. Tickets are $10. We love art!",
      pictureAddress:
        'https://na.cdn.beatsaver.com/b45ee56f8fae47bd5962695800c8ea9362093036.jpg',
    },
    createdAt: new Date('4/18/2022'),
  },
  {
    id: 5,
    tags: [{ tagKeyword: 'Gaming' }, { tagKeyword: 'Social' }],
    postedByEmail: 'tempuser2@hawk.iit.edu',
    postedById: 3,
    title: 'Board Game Club',
    content: {
      body:
        'Do you like board games? Do you like snacks? Come play games this saturday 4/23! We are holding a Candy Land tournament that will be highly competitive and will include prizes! Reach out with any questions!',
      pictureAddress:
        'https://clickamericana.com/wp-content/uploads/Vintage-Candy-Land-game-c1950s-1960s-1-770x758.jpg',
    },
    createdAt: new Date('4/10/2022'),
  },
  {
    id: 6,
    tags: [{ tagKeyword: 'Social' }],
    postedByEmail: 'tempuser2@hawk.iit.edu',
    postedById: 3,
    title: 'Turtle Club',
    content: {
      body:
        'Are you Turtle-y enough for the Turtle club? Tryouts are this Sunday. Only 2 spots are available so practice your turtling and make sure you costume is worthy of this prestigious IIT club.',
      pictureAddress:
        'https://i.pinimg.com/600x315/66/28/58/6628584cc12844bcc9af1f68155c2677.jpg',
    },
    createdAt: new Date('4/11/2022'),
  },
];
