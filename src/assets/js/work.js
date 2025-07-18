const Shuffle = window.Shuffle
//init grid, fade out spinner and fade in grid
function imagesLoadedHandler($grid ){
    console.log("images loaded")
    
    $grid.closest(".meta-section.content-section").find(".spinner-border").animate({ opacity: 0 }, 200, "swing", function () {
        $grid.animate({ opacity: 1 }, 200, "swing");
        console.log("finish images loaded")
        $grid.masonry();
        });
}

$(document).ready(function(){
    var grids = [];
    console.log("doc reayd")
    $('.grid').each(function(i, el){
        //if galleries exist, for each gallery do all the prep
        if ( ($(el).find('.grid-item')).length > 1 ){
            const colW = parseInt((el.offsetWidth  - 220) / 12);
            console.log(colW)
            const $grid = $(el).masonry({
                itemSelector: '.grid-item',
                columnWidth:colW,
                gutter: 20,
                percentPosition: true,
                // horizontalOrder: true,
                initLayout: false,
                containerStyle: null
              });

           //when images are loaded, init the grid
            $grid.imagesLoaded().always(function () {
               imagesLoadedHandler($grid);
            })

            grids.push($grid);
        }
        //if there's no gallery, just show the content
        else{
            $(el).siblings(".spinner-border").animate({ opacity: 0 }, 350, "swing", function () {
                $(el).animate({ opacity: 1 }, 200, "swing");
            });
        }
    });


    //open modal
    $('.image-modal-link').click(function(event){
        event.preventDefault();
        modalHandler(event.currentTarget);
    });

    //click outside of modal or exit button closes modal
    $('.image-modal.overlay-light, .modal .close').click(function(event){
        $('.image-modal').fadeOut(350, 'linear');
    });

    //close modal on escape key
    $(document).keyup(function (e) {
        if (e.keyCode === 27) $('.image-modal').fadeOut(350, 'linear');   // esc
    });

    $('.modal-dialog').click(function(event){
        event.stopPropagation();
    });
});

//get content from clicked link, and populate modal
function modalHandler(link){
    var src = $(link).find('img').attr('src');
    var cap = $(link).find('figcaption').text();
    var title =  $('#work-title').text();
    var imgModal = $('.image-modal');
    imgModal.addClass("active")
    imgModal.find('.modal-image').attr('src', src);
    imgModal.find('a').attr('href', src);
    imgModal.find('.caption').text(cap);
    imgModal.find('.modal-title').text(title);
    imgModal.fadeIn(350,'linear');
}
console.log("js read")
