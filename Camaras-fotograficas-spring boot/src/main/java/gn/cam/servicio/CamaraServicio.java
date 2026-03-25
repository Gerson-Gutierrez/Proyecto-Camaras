package gn.cam.servicio;

import gn.cam.excepcion.RecursoNoEncontradoExcepcion;
import gn.cam.modelo.Camara;
import gn.cam.repositorio.CamaraRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class CamaraServicio implements ICamaraServicio {


   //private static final String RUTA_UPLOADS = "uploads";

    @Autowired
    private CamaraRepositorio camaraRepositorio;

    @Override
    public Camara guardarCamara(Camara camara, MultipartFile imagen) {

        if (imagen != null && !imagen.isEmpty()) {
            try {
                String nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
                Path ruta = Paths.get("uploads").resolve(nombreArchivo);

                Files.createDirectories(ruta.getParent());
                Files.copy(imagen.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

                camara.setImagenUrl("/uploads/" + nombreArchivo);

            } catch (IOException e) {
                throw new RuntimeException("Error al guardar la imagen");
            }
        }

        return camaraRepositorio.save(camara);
    }

    @Override
    public List<Camara> listarCamaras() {
        return camaraRepositorio.findAll();
    }

    @Override
    public Camara buscarCamaraPorId(long idCamara) {
        return camaraRepositorio.findById(idCamara)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion(
                                "No se encontró la cámara con id: " + idCamara
                        ));
    }

    @Override
    public void eliminarCamara(Camara camara) {
        camaraRepositorio.delete(camara);
    }
}
