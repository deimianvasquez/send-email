import React from "react";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
    const { token } = useParams()

    console.log(token)
    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <h2 className="text-center my-3">Actualiza la contraseña</h2>
                    <div className="col-12 col-md-6 border py-4">
                        <form>
                            <div className="form-group mb-3">
                                <label>password:</label>
                                <input
                                    type="password"
                                    placeholder="elquefrao@email.com"
                                    className="form-control"
                                    name="email"
                                // value={user.email}
                                // onChange={handleChange}
                                />
                            </div>

                            {/* <div className="form-group mb-3">
                                <label>Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="123456"
                                    className="form-control"
                                    name="password"
                                // value={user.password}
                                // onChange={handleChange}
                                />
                            </div> */}
                            <button className=" btn btn-outline-primary w-100">Update password</button>
                        </form>

                    </div>
                    {/* <div className="w-100"></div>

                    <div className="col-12 col-md-6 d-flex justify-content-between my-1">
                        <Link to={`/register`}>Registrarme</Link>
                        <Link to={`/recuperar-contrasenia`}>Olvido su contraseña</Link>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default UpdatePassword

