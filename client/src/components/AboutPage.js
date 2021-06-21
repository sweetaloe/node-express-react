import React, { Component } from 'react'
import image1 from '../pictures/img1.png'
import image2 from '../pictures/img2.png'
import image3 from '../pictures/img3.png'

export default class AboutPage extends Component {

    render() {

        return (

            <div>
                <div class="row">
                    <div class="col-6">
                        <h4 class="mt-5">О сайте
                        <small class="text-muted"></small>
                        </h4>

                        <h5 class="mt-5">Сайт разработан с использованием библиотек и фреймворков:</h5>
                        <ul class="list-group list-group-flush">
                            <li class = "list-group-item">React</li>
                            <li class = "list-group-item">Node.js</li>
                            <li class = "list-group-item">Express</li>
                            <li class = "list-group-item">Highcharts</li>
                        </ul>
                        <p></p>
                    </div>

                    <div class="col-6">
                        <h4 class="mt-5">Контакты</h4>
                        <h5 class="mt-5">Данный сайт - результат выполнения Выпускной квалификационной работы </h5>
                        <p class="lead">"Разработка сайта для визуализации временных рядов"</p>
                        <div class="row mt-5">
                            <p class="col-6">Разработан студентом
                            <br/>группы РИ-460004
                            </p>
                            <p class="col-6">Живцовой Викторией</p>
                        </div>
                        <div class="row">
                            <p class="col-6">Github</p>
                            <a class="col-6" href="https://github.com/sweetaloe">sweetaloe</a>
                        </div>
                        <div class="row">
                            <p class="col-6">email</p>
                            <p class="col-6">sweetaloe@yandex.ru</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
