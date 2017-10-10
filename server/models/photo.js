'use strict';
const _ = require('lodash')
module.exports = function(Photo) {

    Photo.addPhoto= function(data,cb){
        const {title,url,tags,album} = data;
        Photo.create({url,title,albumId:album}).        
        then(photo=>{
            let TagCreationPromises = tags.map(tag=>{
                return Photo.app.models.tag.upsertWithWhere({name:tag},{name:tag});
            })
            Promise.all(TagCreationPromises)
            .then(tags=>{
                let PhotoTagCreationPromises = tags.map(tag=>{
                    return Photo.app.models.photoTag.create({tagId:tag.id,photoId:photo.id})
                });
                
                Promise.all(PhotoTagCreationPromises).then(PhotoTag=>{
                    cb(null,PhotoTag)
                })
            })
        }).catch(err=>{
            cb(err)
        })
    }

    Photo.remoteMethod('addPhoto',{
        accepts:[
            {arg: 'data', type:'object', http:{ source:'body'}}
          ],
        http:{verb: 'post',path:'/'},
        returns:{type:"object",root:true},
        isStatic:true
    })

    Photo.disableRemoteMethodByName('find');

    Photo.getPhotos= async function(sort,order,options,cb){
        const token = options && options.accessToken;
        const userId = token && token.userId;
        let app = Photo.app;
        let photos;
        let albumIds = await app.models.album.
            find({where:{userId}}).
            then(albums=>albums.map(album=>album.id))
        
        if(sort){
            let sortBy;
            switch(sort){
                case 'title':
                case 'createdAt':
                    photos = await app.models.Photo.find({where:{albumId:{inq:albumIds}},order:sort+' '+order,include:['tags','album']});
                    break;
                case 'tags':
                    let photosIds = await app.models.Photo
                        .find({where:{albumId:{inq:albumIds}}})
                        .then(photos=>photos.map(photo=>photo.id))
                    photos = await app.models.tag.find({where:{photoId:{inq:photosIds}},order:'name '+order,include:{photos:['tags','album']}})
                    break;
                default:
                    photos = await app.models.Photo.find({where:{albumId:{inq:albumIds}},include:['tags','album']});
            }
        }else{
            photos = await app.models.Photo.find({where:{albumId:{inq:albumIds}},include:['tags','album']});
        }
        cb(null,photos);
    }

    Photo.remoteMethod('getPhotos',{
        accepts:[
            {arg: 'sort', type:'string', http:{ source:'query'}},
            {arg: 'order', type: 'string', http:{ source:'query'}},
            { arg: "options", type: "object", http: "optionsFromRequest" }
          ],
        http:{verb: 'get',path:'/'},
        returns:{type:"object",root:true},
        isStatic:true
    })
    
};
