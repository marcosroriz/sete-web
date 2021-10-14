import { EscolaTableField } from "entities/Escola";
import React from "react";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

class EscolasTableHelper {
    public treatData(data: EscolaTableField[]): any[] {
        console.log(data);
        return data.map((escola) => {
            return {
                ...escola,
                ensino_pre_escola: [data[0].ensino_fundamental, ", ", data[0].ensino_superior],
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

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
