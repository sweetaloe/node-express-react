import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Главная</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link"></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/graph" className="nav-link">Визуализация</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">О нас</Link>
                        </li>
                      
                    </ul>
                </div>
            </nav>
        )
    }
}