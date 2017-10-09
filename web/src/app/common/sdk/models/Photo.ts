/* tslint:disable */
import {
  Tag,
  Album
} from '../index';

declare var Object: any;
export interface PhotoInterface {
  "name"?: string;
  "title"?: string;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "albumId"?: number;
  tags?: Tag[];
  album?: Album;
}

export class Photo implements PhotoInterface {
  "name": string;
  "title": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "albumId": number;
  tags: Tag[];
  album: Album;
  constructor(data?: PhotoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Photo`.
   */
  public static getModelName() {
    return "Photo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Photo for dynamic purposes.
  **/
  public static factory(data: PhotoInterface): Photo{
    return new Photo(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Photo',
      plural: 'Photos',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "albumId": {
          name: 'albumId',
          type: 'number'
        },
      },
      relations: {
        tags: {
          name: 'tags',
          type: 'Tag[]',
          model: 'Tag'
        },
        album: {
          name: 'album',
          type: 'Album',
          model: 'Album'
        },
      }
    }
  }
}