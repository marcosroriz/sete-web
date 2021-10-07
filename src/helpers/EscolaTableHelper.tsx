import React from "react";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

class EscolaTableHelper {
    public treatData(data: any[], aditionalData: any): any[] {
        return data.map((escola) => {
            return {
                ...escola,
                acoes: (
                    <span>
                        <button
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => aditionalData.handleOpenModal()}
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

export { EscolaTableHelper };
