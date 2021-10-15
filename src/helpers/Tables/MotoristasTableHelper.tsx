import React from "react";
import { MotoristaTableField } from "entities/Motorista";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

class MotoristasTableHelper {
    public treatData(data: MotoristaTableField[]): any[] {
        //console.log(data);
        return data.map((motorista) => {
            return {
                ...motorista,
                acoes: (
                    <span>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <FaUserAlt size={"18px"} color={"#1dc7ea"} />
                        </button>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou2")}
                        >
                            <FaSearch size={"18px"} color={"gray"} />
                        </button>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou3")}
                        >
                            <FaEdit size={"18px"} color={"orange"} />
                        </button>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou4")}
                        >
                            <FaRegTimesCircle size={"17px"} color={"red"} />
                        </button>
                    </span>
                ),
            };
        });
    }
}

const motoristasTableHelper = new MotoristasTableHelper();

export { motoristasTableHelper, MotoristasTableHelper };
