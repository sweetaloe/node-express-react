import React, { Component } from 'react'
import image1 from '../pictures/img1.png'
import image2 from '../pictures/img2.png'
import image3 from '../pictures/img3.png'

export default class MainPage extends Component {

    render() {

        return (

            <div>
                <h4 class="mt-5"></h4>

                <div class="mt-5">
                    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={image1} class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Активность солнца</h5>
                                    <p>Графическое представление числа солнечных пятен за всё время наблюдений</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={image2} class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Предсказяния</h5>
                                    <p>Визуализация предсказаний числа солнечных пятен, полученных различными методами </p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={image3} class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Используемые данные</h5>
                                    <p>Данные предоставлены "Всемирным центром обработки данных" </p>
                                    <p>WDC-SILSO, Royal Observatory of Belgium, Brussels</p>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <h4 class="mt-5">Солнечные пятна</h4>
                <p>Со́лнечные пя́тна — тёмные области на Солнце, температура которых понижена примерно на 1500 К по сравнению с окружающими участками фотосферы. Наблюдаются на диске Солнца (с помощью оптических приборов, а в случае крупных пятен — и невооружённым глазом) в виде тёмных пятен. Солнечные пятна являются областями выхода в фотосферу сильных (до нескольких тысяч гаусс) магнитных полей. Потемнение фотосферы в пятнах обусловлено подавлением магнитным полем конвективных движений вещества и, как следствие, снижением потока переноса тепловой энергии в этих областях.</p>
                <p>Количество пятен на Солнце (и связанное с ним число Вольфа) — один из главных показателей солнечной магнитной активности</p>
            </div>
        )
    }
}
