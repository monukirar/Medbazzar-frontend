import { Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";

export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(props.qty);

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));


  useEffect(
    function () {
      setValue(props.qty);
    },
    [props.qty, value]
  );

  const handlePlus = () => {
    setValue((prev) => prev + 1);
    var v = value;
    v = v + 1;
    props.onChange(v);
    if (v) {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Added to cart",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        color: "white",
        background: "#00391c",
      });
    }
  };
  const handleMinus = () => {
    setValue((prev) => prev - 1);
    var v = value;
    v = v - 1;

    props.onChange(v);

    if (v) {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Removed 1 quantity",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        color: "white",
        background: "#00391c",
      });
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {value == 0 ? (
        <IconButton
          style={{ width: props.width, height: 35 }}
          fullWidth
          onClick={handlePlus}
          color="primary"
          aria-label="add to shopping cart"
        >
          <Button
            variant="outlined"
            fullWidth
            endIcon={<AddShoppingCartIcon />}
            size="small"
            style={{
              fontSize: matchesMd ? "0.4em" : "0.6em",
              height: matchesMd ? "2.7em" : "2.2em",
            }}
          >
            ADD
          </Button>
        </IconButton>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-evenly",
            background: "#00391c",
            width: props.width,
            height: 30,
            borderRadius: 4,
          }}
        >
          <span
            onClick={handleMinus}
            style={{
              cursor: "pointer",
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            -
          </span>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {value}
          </span>
          <span
            onClick={handlePlus}
            style={{
              cursor: "pointer",
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            +
          </span>
        </div>
      )}
    </div>
  );
}
