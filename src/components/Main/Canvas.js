import styles from '../../assets/css/canvas.css';
import { useEffect } from 'react';

const Canvas = () => {

    useEffect(() => {
        let c = document.getElementById("myCanvas");
        console.log(c);
        const ctx = c.getContext("2d");
        //fill rect
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, 150, 75);
        //draw rect no fill
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.strokeRect(20, 20, 150, 100);
        //join path
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.lineWidth = "5";
        ctx.strokeStyle = "purple";
        ctx.moveTo(200, 101);
        ctx.lineTo(300, 200);
        ctx.lineTo(200, 30);
        ctx.stroke();
        //draw arc
        ctx.beginPath();
        ctx.arc(200, 200, 50, 0, -Math.PI / 2, true);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Chi Bao", 300, 300);
        //draw quadratic curve
        ctx.beginPath();
        ctx.strokeStyle = "#ccc";
        ctx.moveTo(100, 350);
        ctx.quadraticCurveTo(100, 400, 200, 350);
        ctx.stroke();
        //draw bezier curve
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(250, 350);
        ctx.bezierCurveTo(250, 380, 350, 380, 350, 350);
        ctx.lineTo(400, 400);
        ctx.stroke();
    }, []);



    return (
        <canvas id="myCanvas" width="400px" height="400px" />
    )
}

export default Canvas;