package com.example.accessingdatamysql.auth;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import javax.print.attribute.standard.Media;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.accessingdatamysql.UserRepository;
import com.example.accessingdatamysql.User;

@Controller
@CrossOrigin
@RequestMapping(path="/auth") // This means URL's start with /demo (after Application path)
public class AuthController {

    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;
    @PostMapping(path="/login")
    public @ResponseBody Map<String, String> login(@RequestBody Map<String, String> json) 
    {
        // Assuming you have a JSON library for Java, you can use it to build the response
        Map<String, String> res = new HashMap<String, String>();
        if (!json.containsKey("email") || !json.containsKey("password"))
        {
            res.put("login", "bad request");
            return res;
        }
        Optional<User> user = userRepository.findById(json.get("email"));
        if (user.isPresent())
        {
            User usr = user.get();
            if (usr.getEmail().equals(json.get("email")) && usr.getPassword().equals(json.get("password")))
            {
                res.put("user", user.get().getEmail());
                return res;
            }
            res.put("login", "failed");
            return res;
        }
        res.put("login", "failed");
        return res;
    }
}
