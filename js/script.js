$(document).ready(function() {
    /*!!!!!!!!!!!!!!!!!!!!!! БЛОК ДАННЫХ !!!!!!!!!!!!!!!!*/

    //количество разновидностей тканей
    var clothesCount = 8;

    //кол-во видимых кружочков для тканей
    var visibleClothes = 3;

    //названия тканей при наведении на них мышью
    var titles = [
        'c1',
        'c2',
        'c3',
        'c4',
        'c5',
        'c6',
        'c7',
        'c8'
    ];

    //массив путей к изображениям тканей в кружочках
    var images = [
        'img/c1.jpg',
        'img/c2.jpg',
        'img/c3.jpg',
        'img/c4.jpg',
        'img/c5.jpg',
        'img/c6.jpg',
        'img/c7.jpg',
        'img/c8.jpg'
    ];

    //массив путей к соответсвующим изображениям диванов
    var sofaImages = [
        'img/sofa1.jpg',
        'img/sofa2.jpg',
        'img/sofa3.jpg',
        'img/sofa4.jpg',
        'img/sofa5.jpg',
        'img/sofa6.jpg',
        'img/sofa7.jpg',
        'img/sofa8.jpg'
    ];

    //названия тканей
    var names = [
        'c1',
        'c2',
        'c3',
        'c4',
        'c5',
        'c6',
        'c7',
        'c8'
    ];

    //названия диванов
    var sofas = [
        'd1',
        'd2',
        'd3',
        'd4',
        'd5',
        'd6',
        'd7',
        'd8'
    ];

    /*!!!!!!!!!!!!!!!!! БЛОК ПОДГОТОВИТЕЛЬНЫХ ДЕЙСТВИЙ !!!!!!!!!!!!*/

    //активация tooltip от bootstrap (для всплыв окошка при наведении на ткань)
    $('[data-toggle="tooltip"]').tooltip();

    //присвоение всплывающих надписей из массива titles
    $('[data-toggle="tooltip"]').each(function(index, el) {
        $(this).attr('title', titles[index])
    })

    /*!!!!!!! БЛОК функций !!!!!!!!!!*/

    //функция извлечения номер ткани
    function extractClothNumber(clothName) {
        var imgNumber = 1;
        if (!isNaN(parseInt(clothName[clothName.length - 8])))
            imgNumber = clothName.substr(clothName.length - 8, 2)
        else
            imgNumber = clothName.substr(clothName.length - 7, 1)

        return parseInt(imgNumber)
    }

    /*!!!!!!!! БЛОК РЕАКЦИЙ НА ДЕЙСТВИЯ ПОЛЬЗОВАТЕЛЯ !!!!!!!!!!!!!!!*/

    //задание изображения каждому кружку
    $(".product").each(function(index, el) {
        $(this).css('backgroundImage', 'url(' + images[index] + ')')
    })

    //нажатие на ткань
    $(".product").click(function() {
        //получаем номер ткани, на которую нажали
        var imgName = $(this).css('backgroundImage')
        var imgNumber = extractClothNumber(imgName)

        //показываем соответствующий диван
        $(".image").css('backgroundImage', 'url(' + sofaImages[imgNumber - 1] + ')')

        //устанавливаем соответсвующий текст
        $(".title").text(sofas[imgNumber - 1])
        $(".cloth span").text(titles[imgNumber - 1])
    })

    //нажатие на левую стрелку
    $(".left-control").click(function() {
        //уменьшаем у всех видимых кружочков число в конце на 1
        $(".product").each(function(index, el) {
            var imgName = $(this).css('backgroundImage')
            var imgNumber = extractClothNumber(imgName)

            $(this).css('backgroundImage', 'url('+images[imgNumber - 2]+')')
        })

        //если у первого кружочка первая ткань - то нужно скрыть левую стрелку
        var imgName = $(".product").css('backgroundImage')
        if (extractClothNumber(imgName) === 1)
            $(".left-control").hide()

            //если у общее кол-во тканей > кол-во видимых тканей и у последнего видимого
        //кружочка не последняя ткань - нужно показать правую стрелку
        imgName = $(".product").last().css('backgroundImage')
        console.log('extractClothNumber(imgName) = ',extractClothNumber(imgName))
        if (clothesCount > visibleClothes && extractClothNumber(imgName) != clothesCount)
        {

            $(".right-control").show()
        }
    })

    //нажатие на правую стрелку
    $(".right-control").click(function() {
        //увеличиваем у всех видимых кружочков число в конце на 1
        $(".product").each(function(index, el) {
            var imgName = $(el).css('backgroundImage')
            var imgNumber = extractClothNumber(imgName)
            $(this).css('backgroundImage', 'url('+images[imgNumber]+')')
        })

        //если у последнего видимого кружочка последняя ткань - то нужно скрыть правую стрелку
        var imgName = $(".product").last().css('backgroundImage')
        if (extractClothNumber(imgName) === clothesCount)
            $(".right-control").hide()

        //если у общее кол-во тканей > кол-во видимых тканей и у первого видимого
        //кружочка не первая ткань - нужно показать левую стрелку
        imgName = $(".product").css('backgroundImage')
        if (clothesCount > visibleClothes && extractClothNumber(imgName) != 1)
            $(".left-control").show()
    })
})
