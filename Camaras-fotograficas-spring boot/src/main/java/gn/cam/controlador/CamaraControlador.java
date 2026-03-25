package gn.cam.controlador;

import gn.cam.excepcion.RecursoNoEncontradoExcepcion;
import gn.cam.modelo.Camara;
import gn.cam.servicio.ICamaraServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("cam-app")
@CrossOrigin(value = "http://localhost:5173")
public class CamaraControlador {

    private static final Logger logger =
            LoggerFactory.getLogger(CamaraControlador.class);

    @Autowired
    private ICamaraServicio camaraServicio;

    // ==========================
    // GET - Listar cámaras
    // ==========================
    @GetMapping("/camaras")
    public List<Camara> obtenerCamaras() {
        List<Camara> camaras = camaraServicio.listarCamaras();
        camaras.forEach(c -> logger.info(c.toString()));
        return camaras;
    }

    // ==========================
    // GET - Buscar por ID
    // ==========================
    @GetMapping("/camaras/{id}")
    public ResponseEntity<Camara> obtenerCamaraPorId(@PathVariable long id) {
        Camara camara = camaraServicio.buscarCamaraPorId(id);
        return ResponseEntity.ok(camara);
    }

    // ==========================
    // POST - Crear cámara (con o sin imagen)
    // ==========================
    @PostMapping(
            value = "/camaras",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Camara> agregarCamara(
            @ModelAttribute Camara camara,
            @RequestParam(required = false) MultipartFile imagen
    ) {
        Camara guardada = camaraServicio.guardarCamara(camara, imagen);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    // ==========================
    // DELETE - Eliminar cámara
    // ==========================
    @DeleteMapping("/camaras/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCamara(@PathVariable Long id) {

        Camara camara = camaraServicio.buscarCamaraPorId(id);
        if (camara == null) {
            throw new RecursoNoEncontradoExcepcion(
                    "El id recibido no existe: " + id
            );
        }
        camaraServicio.eliminarCamara(camara);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }



    @PutMapping(
            value = "/camaras/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Camara> actualizarCamara(
            @PathVariable Long id,
            @ModelAttribute Camara camaraRecibida,
            @RequestParam(required = false) MultipartFile imagen
    ) {

        Camara camara = camaraServicio.buscarCamaraPorId(id);

        if (camara == null) {
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        }

        // 🔹 Actualizar campos (respetando tipos de tu entidad)
        camara.setMarca(camaraRecibida.getMarca());
        camara.setModelo(camaraRecibida.getModelo());
        camara.setTipo(camaraRecibida.getTipo());
        camara.setResolucionMP(camaraRecibida.getResolucionMP());
        camara.setGrabaVideo(camaraRecibida.isGrabaVideo());
        camara.setWifi(camaraRecibida.isWifi());
        camara.setPrecio(camaraRecibida.getPrecio());

        // 🔹 Guardar (imagen opcional)
        Camara actualizada = camaraServicio.guardarCamara(camara, imagen);

        return ResponseEntity.ok(actualizada);
    }



}
