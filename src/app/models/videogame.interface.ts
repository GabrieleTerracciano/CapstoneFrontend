export interface Videogame {
    id: number;
    name: string;
    description: string;
    released: string;
    backgroundImage: string;
    metacritic: string;
    addedByStatus: { [key: string]: number };
  
    ratingsTitles: string[];
    ratingsCounts: number[];
    ratingsPercents: number[];
  
    platformName: string;
    platformSlug: string;
    platformRequirementsMinimum: string;
    platformRequirementsRecommended: string;
  
    parentPlatformName: string;
  
    genreNames: string[];
  
    storeNames: string[];
  
    tagNames: string[];
  
    screenshotUrls: string[];
  }
  