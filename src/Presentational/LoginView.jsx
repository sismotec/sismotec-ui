import React, { Component } from 'react';

export default class LoginView extends Component {
  render() {
    return (
      <div>
          <h1>Entrar a mi cuenta</h1>
          <form>
              <div>
                  <h2>Correo electrónico</h2>
                  <input
                      name='username'
                      ref='username'
                      type='text'
                      label='Username'
                      id='username'
                      placeholder='semanai@itesm.mx'
                      autoCorrect='off'
                      autoCapitalize='off'
                      spellCheck='false'
                      defaultValue={this.props.username}
                      onChange={() => this.props.handleChange}/>
              </div>
              <div>
                  <h2>Contraseña</h2>
                  <input
                      name='password'
                      ref='password'
                      label='Password'
                      id='password'
                      type='password'
                      placeholder='*********'
                      defaultValue={this.props.password}
                      onChange={() => this.props.handleChange}/>
              </div>
              <div>
                  <br></br>
                  <button
                      type='submit'
                      onClick={() => this.props.handleSubmit}>
                  Entrar
                  </button>
              </div>
              <div>
                  <h2>¿Aún no tienes cuenta?</h2>
                  <button
                      type='submit'
                      onSubmit={() => this.props.handleCreate}>
                      Crear una cuenta
                  </button>
              </div>
          </form>
      </div>
    )
  }
}