enum Trait {
  Category = 'Category',
  MediaType = 'MediaType',
  LicenseType = 'LicenseType'
}

export const keys = [Trait.Category, Trait.MediaType, Trait.LicenseType]

export const values = {
  [Trait.Category]: ['Art', 'Currency', 'DeFi', 'Games', 'Photography'].sort(),
  [Trait.MediaType]: [
    {
      "mediaType": "Text",
      "summary": "This includes written content in various forms such as research, articles, essays, books, emails, etc."
    },
    {
      "mediaType": "Image",
      "summary": "Static visual content such as photographs, illustrations, diagrams, charts, etc."
    },
    {
      "mediaType": "Audio",
      "summary": "This includes sound-based media such as music, podcasts, audiobooks, etc."
    },
    {
      "mediaType": "Video",
      "summary": "Moving visual content that may include live-action footage, animations, films, etc."
    },
    {
      "mediaType": "Interactive Media",
      "summary": "Content that allows user interaction, such as interactive websites, games, quizzes, etc."
    },
    {
      "mediaType": "Animation",
      "summary": "Moving visual content created through animation techniques, including cartoons, CGI (computer-generated imagery), etc."
    },
    {
      "mediaType": "Virtual Reality (VR) Content",
      "summary": "Immersive digital environments or experiences that simulate physical presence in a virtual world."
    },
    {
      "mediaType": "Augmented Reality (AR) Content",
      "summary": "Digital content overlaid on the real world, often viewed through devices like smartphones or AR glasses."
    },
    {
      "mediaType": "Live Streaming",
      "summary": "Real-time transmission of audio and video content over the internet, commonly used for live events, gaming, etc."
    },
    {
      "mediaType": "Print Media",
      "summary": "Traditional printed materials such as newspapers, magazines, brochures, etc."
    },
    {
      "mediaType": "Social Media",
      "summary": "Online platforms and applications that enable users to create and share content with others, including text, images, videos, etc."
    },
    {
      "mediaType": "Broadcast Media",
      "summary": "Content distributed over radio and television networks, including news programs, TV shows, radio broadcasts, etc."
    },
    {
      "mediaType": "Podcasts",
      "summary": "Digital audio or video files available for download or streaming, typically episodic in nature."
    },
    {
      "mediaType": "E-books",
      "summary": "Digital versions of books or documents that can be read on electronic devices such as e-readers, tablets, smartphones, etc."
    },
    {
      "mediaType": "Web Content",
      "summary": "Content published on the World Wide Web, including websites, blogs, forums, wikis, etc."
    },
    {
      "mediaType": "Mobile Apps",
      "summary": "Software applications designed to run on mobile devices such as smartphones and tablets, offering various types of content and functionality."
    },
    {
      "mediaType": "Gaming",
      "summary": "Interactive entertainment software including video games, mobile games, PC games, console games, etc."
    },
    {
      "mediaType": "Infographics",
      "summary": "Visual representations of information or data designed to make complex concepts easier to understand, often combining text and graphics."
    },
    {
      "mediaType": "Memetic Content",
      "summary": "Content that spreads rapidly online, often in the form of memes, viral videos, internet jokes, etc."
    },
    {
      "mediaType": "User-generated Content (UGC)",
      "summary": "Content created and shared by users, such as social media posts, comments, reviews, etc."
    },
    {
      "mediaType": "Others",
      "summary": "Other types of media not explicitly mentioned in the list."
    }
  ].sort(),
  [Trait.LicenseType]: ['Exclusive', 'Non-Exclusive', 'Limited Use', 'Commercial Use', 'Personal Use'].sort(),
}


type MediaTypeInfo = {
  [key: string]: string;
};

const convertMediaTypeArrayToObject = (array: { mediaType: string; summary: string }[]): MediaTypeInfo => {
  return array.reduce((obj: MediaTypeInfo, item) => {
    obj[item.mediaType] = item.summary;
    return obj;
  }, {});
};

export const mediaTypeObject = convertMediaTypeArrayToObject(values[Trait.MediaType]);