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

                <h4 class="mt-5">Солнечная активность</h4>
                
                <p>Активность Солнца не остаётся постоянной и меняется с течением времени, сохраняя определённые периодические закономерности. Такие изменения во многих аспектах влияют на современную жизнь. </p>
                
                <p>Повышение активности приводит к увеличению ультрафиолетового и рентгеновского излучений, оказывающих сильное воздействие в верхних слоях атмосферы. Последующее за этим увеличение температуры и плотности атмосферы приводит к сокращению срока службы искусственных спутников. Увеличение количества солнечных вспышек и выбросов корональной массы повышает вероятность повреждения чувствительных космических приборов, а также увеличивает опасность для здоровья космонавтов и пилотов, совершающих полёты по полярным маршрутам на большой высоте.</p>
                <p>Кроме этого, солнечная активность оказывает влияние и на земной климат. Несмотря на то, что изменение общей солнечной радиации слишком мало для того, чтобы быть причиной значительных изменений, существуют доказательства, свидетельствующие о связи солнечной активности с нагревом и охлаждением атмосферы.</p>
                <p class="lead"> Влияние Солнца на нашу жизнь в современных реалиях является существенным, а значит наблюдение, сбор, отображение и обработка информации, связанной с солнечной активностью, являются актуальными практическими задачами.</p>
                

            </div>
        )
    }
}
