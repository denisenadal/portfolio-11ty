//init grid, fade out spinner and fade in grid
function showGrid(grid ){
    const $grid = $(grid);
    $grid.masonry();

    $grid.find(".spinner").delay( 300 ).animate({ opacity: 0 }, 350, "swing", function () {
        $grid.animate({ opacity: 1 }, 400, "swing");
        });
}
function hideGrid(el){
    $(el).delay( 300 ).animate({ opacity: 0 }, 350, "swing", function () {
        $(el).find(".spinner").animate({ opacity: 1 }, 400, "swing");
    });
}
function getGridConfig(el){
    const colW = parseInt((el.offsetWidth  - 220) / 12);
   return {
        itemSelector: '.grid-item',
        columnWidth:colW,
        gutter: 20,
        percentPosition: true,
        // horizontalOrder: true,
        initLayout: false,
        containerStyle: null,
        resize: false,
        isResizeBound:false
      };
}

function intersectionCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showGrid(entry.target)
      } else {
        hideGrid(entry.target)
      }

    });
  }

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


$(document).ready(function(){
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0.0, 0.75],
      };
    
    const gridObserver = new IntersectionObserver(intersectionCallback, observerOptions);

    var grids = [];
    console.log("doc reayd")
    $('.grid').each(function(i, el){
        //if galleries exist, for each gallery do all the prep
        if ( ($(el).find('.grid-item')).length > 1 ){
            gridObserver.observe(el)
            const config = getGridConfig(el);
            const $grid = $(el).masonry(config );

            grids.push($grid);
        }
        //if there's no gallery, just show the content
        else{
           hideGrid(el)
        }
    });

    $(window).on('resize', function(e) {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
        console.log('Resized finished.');
        grids.forEach($grid => {
            $grid.masonry('destroy');
            let newConfig = getGridConfig($grid[0]);
            $grid.masonry(newConfig);
            $grid.masonry();
        });
    }, 250);
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