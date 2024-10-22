// import { config } from 'dotenv';

const setEnv = () => {
    // Configure Angular `environment.ts` file path
    const targetPath = './src/enviroments/environment.ts';
    // Load node modules
    require('dotenv').config({
      path: '.env',
    });
    // `environment.ts` file structure
    const envConfigFile = `export const environment = {
   stripeKey: '${process.env['STRIPE_KEY']}',
  };
  `;
  
  const targetPathProd = './src/enviroments/environment.prod.ts';
  // Load node modules
  require('dotenv').config({
    path: '.env',
  });
  // `environment.ts` file structure
  const envConfigFileProd = `export const environment = {
  stripeKey: '${process.env['STRIPE_KEY']}',
  
  };
  `;
  
    require("fs").writeFile(targetPath, envConfigFile, (err: any) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        );
      }
    });
  
    require("fs").writeFile(targetPathProd, envConfigFileProd, (err: any) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(
          `Angular environment.ts file generated correctly at ${targetPathProd} \n`
        );
      }
    });
  };
  
  setEnv();