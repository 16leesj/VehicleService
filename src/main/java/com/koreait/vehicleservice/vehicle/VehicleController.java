package com.koreait.vehicleservice.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("vehicle")
public class VehicleController {

    @Autowired
    public VehicleService service;


    @GetMapping("/list")
    public void list(Model model, VehicleDto dto) {
        model.addAttribute("data", service.vehicleList(dto));
    }

    @GetMapping("/list/for")
    public void listfor(){}

    @GetMapping("/detail")
    public void detail(){

    }

    @GetMapping("/write")
    public void write(){

    }

    @PostMapping("/write")
    public String inVehicle(VehicleDto dto, @RequestParam MultipartFile mainimg){
        service.inVehicle(dto);
        String fileNm = service.uploadMainImg(mainimg);
        return "redirect:list";
    }
}
