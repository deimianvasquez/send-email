import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useSearchParams } from "react-router-dom";

const UpdatePassword = () => {

    let [searchParams, _] = useSearchParams();
    const { actions } = useContext(Context)

    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        let result = actions.updatePassword(searchParams.get("token"), newPassword)
        // console.log(result)
    }



    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <h2 className="text-center my-3">Actualiza la contraseña</h2>
                    <div className="col-12 col-md-6 border py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>password:</label>
                                <input
                                    type="password"
                                    placeholder="elquefrao@email.com"
                                    className="form-control"
                                    name="email"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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

