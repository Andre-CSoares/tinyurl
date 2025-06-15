import React, { useState } from "react";
import axios from "axios";

const AddUrlComponent = () => {
    const [url, setUrl] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (!url) {
            alert("Please enter something");
            return;
        }

        axios
            .post("http://localhost:3333/short", { origUrl: url })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });

        setUrl("")
    }

    console.log(url)

    return (
        <div>
            <main>
                <section className="card w-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="title mb-2 fs-1">Entre com sua URL</h1>
                    <form className="w-50" onSubmit={onSubmit}>
                        <input
                            className="input w-100 border border-primary p-2 mb-2 fs-3 h-25"
                            type="text"
                            placeholder="http://samplesite.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button type="submit">
                                <span class="button_top"> Enviar </span>
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddUrlComponent;