<?php

    class permisos extends permisos_model{

        public function __construct()
        {
            $this->model = new permisos_model();
            parent::__construct();
        }

        public function getModules()
        {
            $arrData = $this->model->selectModules();
            return $arrData;
            die();
        }

        public function getPermits()
        {
            $arrData = $this->model->selectPermits();
            return $arrData;
            die();
        }

        public function setPermisos(array $datos)
        {
            if ($datos) {
                if (empty($datos['modules']) || empty($datos['pk_fk_id_roles'])) {
                    $arrResponse = array('status' => false, 'msg' => 'Datos incorrectos.');
                } else {
                    $idPermits = $datos['idPermits'];
                    $modules = $datos['modules'];
                    $pk_fk_id_roles = $datos['pk_fk_id_roles'];
                    if (isset($datos['view'])) {
                        $view = 1;
                    } else {
                        $view = 2;
                    }
                    if (isset($datos['create'])) {
                        $create = 1;
                    } else {
                        $create = 2;
                    }
                    if (isset($datos['edit'])) {
                        $edit = 1;
                    } else {
                        $edit = 2;
                    }
                    if (isset($datos['delete'])) {
                        $delete = 1;
                    } else {
                        $delete = 2;
                    }
                    $created_at = date("Y-m-d H:i:s");
                    $updated_at = date("Y-m-d H:i:s");
                    $data = array( $pk_fk_id_roles,
                    $modules,
                    $view,
                    $create,
                    $edit,
                    $delete,
                    $created_at,
                    $updated_at);
                    if ($idPermits == 0) {
                        $option = 1;
                        $request_permits = $this->model->insertPermit(
                            $pk_fk_id_roles,
                            $modules,
                            $view,
                            $create,
                            $edit,
                            $delete,
                            $created_at,
                            $updated_at
                        );
                    } else {
                        # code...
                    }
                    if ($request_permits > 0) {
                        if($option == 1){
                            $arrResponse = array('status' => true, 'msg' => 'Datos guardados correctamente.');
                        }else{
                            $arrResponse = array('status' => true, 'msg' => 'Datos actualizados correctamente.');
                        }
                    } else if($request_permits == 'exist') {
                        $arrResponse = array('status' => false, 'msg' => '¡Atención! el permiso ya esta asociado a un modulo para el tipo de rol.');
                    } else {
                        $arrResponse = array('status' => false, 'msg' => 'No es posible almacenar los datos.');
                    }         
                }
                return $arrResponse;
            }
            die();
        }

    }

?>