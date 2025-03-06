
$(document).ready(function(){
    var grids = [];

    $('.grid').each(function(i, el){
        //if galleries exist, for each gallery do all the prep
        if ( ($(el).find('.grid-item')).length > 1 ){

            var $grid = $(el).masonry({
                // options...
                columnWidth: '.grid-sizer',
                itemSelector: '.grid-item',
                percentPosition: true,
                gutter: 0,
                initLayout: false,
            });

           //when images are loaded, init the grid
            $grid.imagesLoaded().done(function () {
               imagesLoadedHandler($grid);
            })
            .fail(function () {
                imagesLoadedHandler($grid);
            });

            grids.push($grid);
        }
        //if there's no gallery, just show the content
        else{
            $(el).prev().animate({ opacity: 0 }, 350, "swing", function () {
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

//init grid, fade out spinner and fade in grid
function imagesLoadedHandler($grid ){
    $grid.masonry('layout');
    $grid.prev().animate({ opacity: 0 }, 350, "swing", function () {
        $grid.animate({ opacity: 1 }, 200, "swing");
    });
}

//get content from clicked link, and populate modal
function modalHandler(link){
    var src = $(link).find('img').attr('src');
    var cap = $(link).find('figcaption').text();
    var title =  $('#work-title').text();
    var imgModal = $('.image-modal');
    imgModal.find('.modal-image').attr('src', src);
    imgModal.find('a').attr('href', src);
    imgModal.find('.caption').text(cap);
    imgModal.find('.modal-title').text(title);
    imgModal.fadeIn(350,'linear');
}