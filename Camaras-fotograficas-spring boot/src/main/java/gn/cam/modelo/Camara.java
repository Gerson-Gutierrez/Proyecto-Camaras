package gn.cam.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Camara {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCamara;

    private String marca;
    private String modelo;
    private String tipo;
    private int resolucionMP;
    private boolean grabaVideo;
    private boolean wifi;
    private double precio;
    @Column(name = "imagen_url")
    private String imagenUrl;
}