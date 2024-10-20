const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};
const crearEvento = async (req, res = response) => {
  // verificar que tenga el evento
  const evento = Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no Existe",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No Tiene privilegio de editar el evento",
      });
    }

    // actualizar los valores
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  const evento = await Evento.findById(eventoId);
  if (!evento) {
    return res.status(404).json({
      ok: false,
      msg: "Evento no Existe",
    });
  }

  if (evento.user.toString() !== uid) {
    return res.status(401).json({
      ok: false,
      msg: "No Tiene privilegio de Eliminar el evento",
    });
  }

  await Evento.findByIdAndDelete(eventoId);
  res.json({
    ok: true,
    msg: "Evento Eliminado",
  });

  try {
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
