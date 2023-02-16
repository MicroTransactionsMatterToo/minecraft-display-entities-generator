function transform() {
//Get Rotation parameters
var x_rot = document.getElementById("x_rotation").value
var y_rot = document.getElementById("y_rotation").value
var z_rot = document.getElementById("z_rotation").value
//convert to Rad
x_rot = x_rot / 180 * Math.PI
y_rot = y_rot / 180 * Math.PI
z_rot = z_rot / 180 * Math.PI
//Get Shearing Parameters
var x_shear = document.getElementById("x_shear").value
var y_shear = document.getElementById("y_shear").value
var z_shear = document.getElementById("z_shear").value
//Get Scaling Parameters
var x_scale = document.getElementById("x_scale").value
var y_scale = document.getElementById("y_scale").value
var z_scale = document.getElementById("z_scale").value
//Get Translation Parameters
var x_offset = document.getElementById("x_translate").value
var y_offset = document.getElementById("y_translate").value
var z_offset = document.getElementById("z_translate").value
//Set Base Matrix
var matrix_id = [[x_scale,0,0,0],[0,y_scale,0,0],[0,0,z_scale,0],[0,0,0,1]]
var shear_matrix = [[1,y_shear,z_shear,0],[x_shear,1,z_shear,0],[x_shear,y_shear,1,0],[0,0,0,1]]
var rot_matrix = [[Math.cos(y_rot)*Math.cos(z_rot),Math.sin(x_rot)*Math.sin(y_rot)*Math.cos(z_rot)-Math.cos(x_rot)*Math.sin(z_rot),Math.cos(x_rot)*Math.sin(y_rot)*Math.cos(z_rot+Math.sin(x_rot)*Math.sin(z_rot)),0],[Math.cos(y_rot)*Math.sin(z_rot),Math.sin(x_rot)*Math.sin(y_rot)*Math.sin(z_rot)+Math.cos(x_rot)*Math.cos(z_rot),Math.cos(x_rot)*Math.sin(y_rot)*Math.sin(z_rot)-Math.sin(x_rot)*Math.cos(z_rot),0],[-Math.sin(y_rot),Math.sin(x_rot)*Math.cos(y_rot),Math.cos(x_rot)*Math.cos(y_rot),0],[0,0,0,1]]

result = multiply_matrix(matrix_id,rot_matrix)
result = multiply_matrix(result,shear_matrix)

document.getElementsByClassName("cube")[0].style.transform = "matrix3d("+result[0][0]+","+result[0][1]+","+result[0][2]+","+result[0][3]+","+result[1][0]+","+result[1][1]+","+result[1][2]+","+result[1][3]+","+result[2][0]+","+result[2][1]+","+result[2][2]+","+result[2][3]+","+result[3][0]+","+result[3][1]+","+result[3][2]+","+result[3][3]+")"
    result[0][3] = x_offset;
    result[1][3] = y_offset;
    result[2][3] = z_offset;
    document.getElementById("commandOutput").value = "summon minecraft:block_display ~ ~ ~ {block_state:{Name:\"minecraft:stone\"},billboard:\"fixed\",glow_color_override:0,interpolation_duration:0,interpolation_start:-1,transformation:["+result[0][0]+"f,"+result[0][1]+"f,"+result[0][2]+"f,"+result[0][3]+"f,"+result[1][0]+"f,"+result[1][1]+"f,"+result[1][2]+"f,"+result[1][3]+"f,"+result[2][0]+"f,"+result[2][1]+"f,"+result[2][2]+"f,"+result[2][3]+"f,"+result[3][0]+"f,"+result[3][1]+"f,"+result[3][2]+"f,"+result[3][3]+"f],view_range:1.0f,shadow_radius:1,shadow_strength:1}"
}

function multiply_matrix(m1,m2) {
fil_m1 = m1.length;  
col_m1 = m1[0].length;    
fil_m2 = m2.length;  
col_m2 = m2[0].length;
if (col_m1 != fil_m2)    
throw "Matrices cannot be multiplied";
let multiplication = new Array(fil_m1);  
for (x=0; x<multiplication.length;x++)      
multiplication[x] = new Array(col_m2).fill(0);
for (x=0; x < multiplication.length; x++) {      
for (y=0; y < multiplication[x].length; y++) {  
    for (z=0; z<col_m1; z++) {              
               multiplication [x][y] = multiplication [x][y] + m1[x][z]*m2[z][y];
               }      
    }  
}
return multiplication
}

function resetRotation() {
    document.getElementById('x_rotation').value=0;
    document.getElementById('y_rotation').value=0;
    document.getElementById('z_rotation').value=0;
    transform();
    document.getElementById('x_rot_val').innerHTML='0°';
    document.getElementById('y_rot_val').innerHTML='0°';
    document.getElementById('z_rot_val').innerHTML='0°';
}

function rotationStep(val) {
    document.getElementById('x_rotation').step = val;
    document.getElementById('y_rotation').step = val;
    document.getElementById('z_rotation').step = val;
}
    
    
    
