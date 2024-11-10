(function($){$.fn.mauGallery=function(options){const settings=$.extend({},$.fn.mauGallery.defaults,options);let tagsCollection=[];return this.each(function(){const $gallery=$(this);$.fn.mauGallery.methods.createRowWrapper($gallery);if(settings.lightBox){$.fn.mauGallery.methods.createLightBox($gallery,settings.lightboxId,settings.navigation)}
$.fn.mauGallery.listeners(settings);const $items=$gallery.children(".gallery-item");$items.each(function(){const $item=$(this);$.fn.mauGallery.methods.responsiveImageItem($item);$.fn.mauGallery.methods.moveItemInRowWrapper($item);$.fn.mauGallery.methods.wrapItemInColumn($item,settings.columns);const theTag=$item.data("gallery-tag");if(settings.showTags&&theTag&&!tagsCollection.includes(theTag)){tagsCollection.push(theTag)}});if(settings.showTags){$.fn.mauGallery.methods.showItemTags($gallery,settings.tagsPosition,tagsCollection)}
$gallery.fadeIn(500)})};$.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0};$.fn.mauGallery.listeners=function(options){$(".gallery-item").on("click",function(){if(options.lightBox&&this.tagName==="IMG"){$.fn.mauGallery.methods.openLightBox($(this),options.lightboxId)}});$(".gallery").on("click",".nav-link",$.fn.mauGallery.methods.filterByTag);$(".gallery").on("click",".mg-prev",()=>$.fn.mauGallery.methods.prevImage(options.lightboxId));$(".gallery").on("click",".mg-next",()=>$.fn.mauGallery.methods.nextImage(options.lightboxId))};$.fn.mauGallery.methods={createRowWrapper($element){if(!$element.children().first().hasClass("row")){$element.append('<div class="gallery-items-row row"></div>')}},wrapItemInColumn($element,columns){let columnClass='';if(typeof columns==='number'){columnClass=`col-${Math.ceil(12 / columns)}`}else if(typeof columns==='object'){Object.keys(columns).forEach(size=>{columnClass+=` col-${size}-${Math.ceil(12 / columns[size])}`})}else{console.error(`Type des colonnes invalide : ${typeof columns}`);return}
$element.wrap(`<div class='item-column mb-4 ${columnClass}'></div>`)},moveItemInRowWrapper($element){$element.appendTo(".gallery-items-row")},responsiveImageItem($element){if($element.prop("tagName")==="IMG"){$element.addClass("img-fluid")}},openLightBox($element,lightboxId){const $lightbox=$(`#${lightboxId || 'galleryLightbox'}`);$lightbox.find(".lightboxImage").attr("src",$element.attr("src"));$lightbox.modal("toggle")},prevImage(lightboxId){this.navigateImage(lightboxId,-1)},nextImage(lightboxId){this.navigateImage(lightboxId,1)},navigateImage(lightboxId,direction){const $activeImage=$("img.gallery-item").filter((_,img)=>$(img).attr("src")===$(".lightboxImage").attr("src"));const activeTag=$(".tags-bar span.active-tag").data("images-toggle");let $images=activeTag==="all"?$(".item-column img"):$(".item-column img").filter((_,img)=>$(img).data("gallery-tag")===activeTag);let index=$images.index($activeImage);index=(index+direction+$images.length)%$images.length;$(".lightboxImage").attr("src",$($images[index]).attr("src"))},createLightBox($gallery,lightboxId,navigation){const $modal=$(`
        <div class="modal fade" id="${lightboxId || 'galleryLightbox'}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : ''}
                <img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>
                ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : ''}
              </div>
            </div>
          </div>
        </div>
      `);$gallery.append($modal)},showItemTags($gallery,position,tags){const tagItems=tags.reduce((acc,tag)=>{acc+=`<li class="nav-item"><span class="nav-link" data-images-toggle="${tag}">${tag}</span></li>`;return acc},`<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>`);const tagsRow=`<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;position==="bottom"?$gallery.append(tagsRow):position==="top"?$gallery.prepend(tagsRow):console.error(`Position des tags inconnue : ${position}`)},filterByTag(){if($(this).hasClass("active-tag"))return;$(".active.active-tag").removeClass("active active-tag");$(this).addClass("active-tag active");const tag=$(this).data("images-toggle");$(".gallery-item").each(function(){const $itemColumn=$(this).parents(".item-column");tag==="all"||$(this).data("gallery-tag")===tag?$itemColumn.show(300):$itemColumn.hide()})}}})(jQuery)