import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            <footer class="page-footer bg-dark  text-center  text-white mt-5 ">

                <div class="container-fluid">
                    <div class="row">

                        <div class="col-md-6">
                            <h5 class="title mt-4">Визуализация временных рядов</h5>
                            <p>Построение числа солнечных пятен и предсказаний</p>
                        </div>

                        <div class="col-md-6 mt-4">
                            <h5 class="title">Github</h5>
                            <a href="https://github.com/sweetaloe">sweetaloe</a>
                            <h5 class="title">Источник данных</h5>
                            <a href="http://sidc.oma.be/silso/datafiles">WDC-SILSO, Royal Observatory of Belgium, Brussels</a>
                        </div>

                    </div>
                </div>

                <div class="footer-copyright text-center">
                    <div class="container-fluid">
                        @2020, sweetaloe 
                    </div>
                </div>


            </footer>
        )
    }
}