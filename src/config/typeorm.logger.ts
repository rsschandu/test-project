import { Logger, QueryRunner } from 'typeorm';

export class CustomTypeORMLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    console.log('Query:', query);
    if (parameters && parameters.length > 0) {
      console.log('Parameters:', parameters);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    console.error('Query Error:', error);
    console.error('Query:', query);
    if (parameters && parameters.length > 0) {
      console.error('Parameters:', parameters);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    console.warn('Query took too long to execute:', time);
    console.warn('Query:', query);
    if (parameters && parameters.length > 0) {
      console.warn('Parameters:', parameters);
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    console.log('Schema Build:', message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    console.log('Migration:', message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    switch (level) {
      case 'log':
        console.log(message);
        break;
      case 'info':
        console.info(message);
        break;
      case 'warn':
        console.warn(message);
        break;
      default:
        console.log(message);
        break;
    }
  }
}
