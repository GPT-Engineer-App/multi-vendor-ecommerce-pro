import React, { useState } from "react";
import { Container, VStack, HStack, Text, Button, Input, Image, Box, IconButton, Select, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaPlus, FaMinus } from "react-icons/fa";

const Index = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, image: 'https://images.unsplash.com/photo-1705096953495-8ea06879b986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMXxlbnwwfHx8fDE3MTc1ODE4NDF8MA&ixlib=rb-4.0.3&q=80&w=1080', quantity: 1 },
    { id: 2, name: "Product 2", price: 200, image: 'https://images.unsplash.com/photo-1524143878510-e3b8d6312402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMnxlbnwwfHx8fDE3MTc1ODE4NDF8MA&ixlib=rb-4.0.3&q=80&w=1080', quantity: 1 },
  ]);
  const toast = useToast();

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleQuantityChange = (product, increment) => {
    setProducts(products.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + increment } : p)));
  };

  return (
    <Container maxW="container.xl" p={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">Multi-Vendor E-Commerce</Text>
        <HStack spacing={4}>
          <IconButton aria-label="Wishlist" icon={<FaHeart />} />
          <IconButton aria-label="Cart" icon={<FaShoppingCart />} />
          <IconButton aria-label="User Profile" icon={<FaUser />} />
        </HStack>
      </HStack>

      <HStack mb={4}>
        <Input placeholder="Search products..." />
        <IconButton aria-label="Search" icon={<FaSearch />} />
      </HStack>

      <Select placeholder="Select category" mb={4}>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </Select>

      <VStack spacing={4}>
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width="100%">
            <HStack spacing={4}>
              <Image src={product.image} alt={product.name} boxSize="100px" />
              <VStack align="start">
                <Text fontSize="xl">{product.name}</Text>
                <Text>${product.price}</Text>
                <HStack>
                  <IconButton aria-label="Decrease quantity" icon={<FaMinus />} onClick={() => handleQuantityChange(product, -1)} isDisabled={product.quantity <= 1} />
                  <Text>{product.quantity}</Text>
                  <IconButton aria-label="Increase quantity" icon={<FaPlus />} onClick={() => handleQuantityChange(product, 1)} />
                </HStack>
                <HStack>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                  <Button onClick={() => addToWishlist(product)}>Add to Wishlist</Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
