package com.agile.calculator;

import static org.junit.Assert.*;

import org.junit.BeforeClass;
import org.junit.Test;

public class CalculatorTest {

	static Calculator calculator;

	@BeforeClass
	public static void setup(){
		calculator = new Calculator();
	}

	@Test
	public void subtractionTest(){
		assertEquals(10, calculator.subtract("20,10"));
	}
	

	@Test
	public void multiplyTest(){
		assertEquals(10, calculator.multiply("2,5"));
	}

	@Test
	public void divideTest(){
		assertEquals(2, calculator.divide("6,3"));
	}

	@Test
	public void multiplyTestNoComma(){
		assertEquals(-9999, calculator.multiply("8 2"));
	}

	@Test
	public void divideTestNoComma(){
		assertEquals(250, calculator.divide("500 2"));
	}
}
