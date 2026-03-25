package gn.cam.servicio;

import gn.cam.modelo.Camara;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ICamaraServicio {
    public List<Camara> listarCamaras();

    public Camara buscarCamaraPorId(long idCamara);

    Camara guardarCamara(Camara camara, MultipartFile imagen);

    public void eliminarCamara(Camara camara);

}
